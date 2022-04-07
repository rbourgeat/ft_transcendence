import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, QueryRunner, PessimisticLockTransactionRequiredError } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { CreateChatDto } from './dto/chat.dto';
import { User } from 'src/user/entity/user.entity';
import { Message } from 'src/chat/message/entity/message.entity'
import { CreateMessageDto, SendMessageToChatDto } from './dto/message.dto';
import { Participate, UserStatus } from 'src/participate/participate.entity';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { AuthService } from '../auth/auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Chat)
		private chatRepository: Repository<Chat>,
		@InjectRepository(Message)
		private messageRepository: Repository<Message>,
		@InjectRepository(Participate)
		private participateRepository: Repository<Participate>,
		private readonly authenticationService: AuthService
	) { }

	async saveMessage(content: string, author: User) {
		const newMessage = await this.messageRepository.create({
			content,
			author
		});
		await this.messageRepository.save(newMessage);
		return newMessage;
	}

	async saveChatMessage(chatName: string, content: string, author: User) {
		const channel = await this.getChatByName(chatName);
		const newMessage = await this.messageRepository.create({
			content,
			author,
			channel
		});
		await this.messageRepository.save(newMessage);
		return newMessage;
	}

	async getAllMessages() {
		return this.messageRepository.find({
			relations: ['author']
		});
	}

	async getUserFromSocket(socket: Socket) {
		const cookie = socket.handshake.headers.cookie;
		if (cookie)
		{
			const { Authentication: authenticationToken } = parse(cookie);
			const user = await this.authenticationService.getUserFromAuthenticationToken(authenticationToken);
			if (!user) {
				throw new WsException('Invalid credentials.');
			}
			return user;
		}
	}

	getAllChats() {
		return this.chatRepository.find({ relations: ['participates'] });
	}

	async getChatByName(name: string) {
		console.log('we search for chat: ' + name);
		const chat = await this.chatRepository.findOne({ name: name });
		if (chat)
			return chat;
		else {
			console.log(chat + ' not found');
			return;
		}
	}

	/**
	 * 1.check for duplicate
	 * 2.create new participant
	 * 3. create new channel
	 */

	async createChat(chat: CreateChatDto, user: User) {
		if (await this.getChatByName(chat.name))
			return console.log('error: ' + chat + ' already exist');;

		const newParticipate = await this.participateRepository.create(
			{
				user: user,
				admin: true,
				owner: true
			}
		);
		await this.participateRepository.save(newParticipate);

		const newChat = await this.chatRepository.create(
			{
				...chat,
				participates: [newParticipate]
			}
		);
		await this.chatRepository.save(newChat);
		return newChat;
	}

	async createMessage(message: CreateMessageDto, user: User) {
		const newMessage = await this.messageRepository.create({
			...message,
			author: user
		});
		await this.messageRepository.save(newMessage);
		return newMessage;
	}

	async sendMessage(message: SendMessageToChatDto, user: User) {
		console.log('search for chat');

		let chat = await this.getChatByName(message.channel);

		let participate = await this.participateRepository.findOne({ user: user, chat: chat });
		if (participate.role == UserStatus.BAN || participate.role == UserStatus.MUTE) {
			console.log('can\'t send message, you are banned or mute');
			return;
		}
		const newMessage = await this.messageRepository.create({
			content: message.content,
			author: user,
			channel: chat
		});
		await this.messageRepository.save(newMessage);
		return newMessage;
	}

	/**
	 *	1. check if chat exists
	 *	2. check if private + password
	 *	3. save new participant
	 */

	async joinChat(chat: CreateChatDto, user: User) {
		let joinedChat = await this.getChatByName(chat.name);
		if (joinedChat) {
			if (chat.password == joinedChat.password) {
				console.log('has good pass');
				let chatT = await this.getChatByName(chat.name);
				let participate = await this.participateRepository.findOne({ user: user, chat: chatT });
				console.log(participate);
				if (!participate) {
					const newParticipate = await this.participateRepository.create(
						{
							user: user,
							chat: joinedChat
						}
					);
					await this.participateRepository.save(newParticipate);
					return console.log('create new channel member: ' + newParticipate.user.login);;
				}
				else if (participate && participate.role != UserStatus.BAN)
					return console.log('you are banned from this channel');
				else if (participate)
					return console.log('already in channel');
			}
			else
				return console.log('wrong password');
		}
		else
			return console.log(chat + ' not found');
	}

	async quitChat(chat: CreateChatDto, user: User) {
		const chatT = await this.chatRepository.findOne({ name: chat.name });
		let participateToDelete = await this.participateRepository.findOne({ user: user, chat: chatT });
		await this.participateRepository.delete(participateToDelete);
		return console.log('has quit chat');
	}

	async getMessages(id: number) {
		const chat = await this.chatRepository.findOne({ id });

		const query = this.messageRepository
			.createQueryBuilder('message')
			.leftJoin('message.chat', 'chat')
			.where('chat.id = :id', { id: chat.id })
		//.orderBy(createdAt, DESC)
		const messageFound: Message[] = await query.getMany();

		let history: Message[] = [];
		for (const message of messageFound) {
			history.push(message);
		}
		return history;
	}

	async ban(id: number, login: string, admin: User, time: Date) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = chat.participates.find(e => e == user.participate.find(e => e.chat == chat));
		if (!participate)
			return console.log("L'utilisateur ne peut pas être banni car il n'est pas dans le chat !");
		if (!admin.participate.find(e => e.chat == chat).admin)
			return console.log("L'utilisateur ne peut pas bannir car il n'est pas admin du chat !");
		if (user.participate.find(e => e.chat == chat).admin || user.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas bannir un admin !");

		user.participate.find(e => e.chat == chat).role = UserStatus.BAN;

		await this.userRepository.save(user);
		if (time)
			user.participate.find(e => e.chat == chat).timestamp = time;

		await this.userRepository.save(user);
		console.log(user + ' banned');
		return user.participate.find(e => e.chat == chat);
	}

	async active(id: number, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = chat.participates.find(e => e == user.participate.find(e => e.chat == chat));

		if (!participate)
			return console.log("L'utilisateur ne peut pas être débanni/démute car il n'est pas dans le chat !");
		if (!admin.participate.find(e => e.chat == chat).admin)
			return console.log("L'utilisateur ne peut pas débannir/démute car il n'est pas admin du chat !");

		user.participate.find(e => e.chat == chat).role = UserStatus.ACTIVE;

		user.participate.find(e => e.chat == chat).timestamp = null;

		await this.userRepository.save(user);
		console.log(user + ' unbanned or unmuted');
		return user.participate.find(e => e.chat == chat);
	}

	async mute(id: number, login: string, admin: User, time: Date) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = chat.participates.find(e => e == user.participate.find(e => e.chat == chat));
		if (!participate)
			return console.log("L'utilisateur ne peut pas être mute car il n'est pas dans le chat !");
		if (!admin.participate.find(e => e.chat == chat).admin)
			return console.log("L'utilisateur ne peut pas mute car il n'est pas admin du chat !");
		if (user.participate.find(e => e.chat == chat).admin || user.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas mute un admin !");

		user.participate.find(e => e.chat == chat).role = UserStatus.MUTE;
		if (time)
			user.participate.find(e => e.chat == chat).timestamp = time;

		await this.userRepository.save(user);
		console.log(user + ' mute');
		return user.participate.find(e => e.chat == chat);
	}

	async setAdmin(id: number, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = chat.participates.find(e => e == user.participate.find(e => e.chat == chat));
		if (!participate)
			return console.log("L'utilisateur ne peut pas être admin car il n'est pas dans le chat !");
		if (!admin.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas rendre qqn admin car il n'est pas owner du chat !");
		if (user.participate.find(e => e.chat == chat).admin || user.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas rendre admin un admin !");

		user.participate.find(e => e.chat == chat).admin = true;

		await this.userRepository.save(user);
		console.log(user + ' is now an admin');
		return user.participate.find(e => e.chat == chat);
	}

	async password(id: number, admin: User, password: string) {
		const chat = await this.chatRepository.findOne({ id });
		if (!admin.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas setup un mdp car il n'est pas owner du chat !");

		chat.password = password;

		/*
		if (chat.password != null)
			chat.public = false;
		else
			chat.public = true;
		*/
		await this.chatRepository.save(chat);
		console.log("chat password edit");
		return chat;
	}

	async setPrivate(id: number, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		if (!admin.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas set le chat en privé car il n'est pas owner !");

		chat.public = false;

		await this.chatRepository.save(chat);
		console.log("chat set to private");
		return chat;
	}

	async setPublic(id: number, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		if (!admin.participate.find(e => e.chat == chat).owner)
			return console.log("L'utilisateur ne peut pas set le chat en public car il n'est pas owner !");

		chat.public = true;

		await this.chatRepository.save(chat);
		console.log("chat set to public");
		return chat;
	}

}
