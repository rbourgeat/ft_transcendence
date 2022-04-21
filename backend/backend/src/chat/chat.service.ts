import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

	async joinableChannels(user: User) {
		const chats = await this.chatRepository.find({
			relations: ['participates'],
		});

		const channelsToJoinIds: number[] = [];
		chats.forEach((chat: Chat) => {
			let hasJoined = false;

			chat.participates.forEach((participate: Participate) => {
				console.log("test:" + participate.login + ' is in chat: ' + chat.name);
				if (participate.login === user.login42)
					hasJoined = true;
			});
			if (hasJoined === false && chat.direct == false && chat.public == true) {
				channelsToJoinIds.push(chat.id);
			}
		});
		return this.chatRepository.findByIds(channelsToJoinIds);
	}

	async getChatsFromUser(user: User) {
		const listParticipateCard = await this.participateRepository.find({
			where: [
				{ user: user },
			],
			relations: ['user', 'chat'],
		});

		const channelsIds: number[] = [];
		listParticipateCard.forEach((participate: Participate) => {
			channelsIds.push(participate.chat.id);
		});
		return this.chatRepository.findByIds(channelsIds);
	}

	async getUserFromSocket(socket: Socket) {
		const cookie = socket.handshake.headers.cookie;
		if (cookie) {
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
				owner: true,
				login: user.login42,
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

	async createDirectMessage(user1: User, user2: User) {
		if (await this.getChatByName("direct_" + user1.id + "_" + user2.id)) {
			console.log('error: conv already exist');
			throw new BadRequestException('Validation failed (files expected)');
		}
		const newParticipate1 = await this.participateRepository.create(
			{
				user: user1,
				admin: false,
				owner: false,
				login: user1.login42,
			}
		);
		await this.participateRepository.save(newParticipate1);
		const newParticipate2 = await this.participateRepository.create(
			{
				user: user2,
				admin: false,
				owner: false,
				login: user2.login42,
			}
		);
		await this.participateRepository.save(newParticipate2);

		const chatName = "direct_" + user1.id + "_" + user2.id;
		const newChat = await this.chatRepository.create(
			{
				name: chatName,
				direct: true,
				public: false,
				participates: [newParticipate1, newParticipate2]
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

		const chat = await this.getChatByName(message.channel);

		const participate = await this.participateRepository.findOne({ user: user, chat: chat });
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
		const joinedChat = await this.getChatByName(chat.name);
		if (joinedChat) {
			if (chat.password == joinedChat.password) {
				console.log('has good pass');
				const chatT = await this.getChatByName(chat.name);
				const participate = await this.participateRepository.findOne({ user: user, chat: chatT });
				console.log(participate);
				if (!participate) {
					const newParticipate = await this.participateRepository.create(
						{
							user: user,
							chat: joinedChat,
							login: user.login42,
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

	async quitChat(id: number, user: User) {
		const chatT = await this.chatRepository.findOne({ id });
		const participateToDelete = await this.participateRepository.findOne({ user: user, chat: chatT });
		await this.participateRepository.delete(participateToDelete);
		return console.log('has quit chat');
	}

	async getMessages(id: number) {
		console.log(id);
		const chat = await this.chatRepository.findOne({ id });

		console.log(chat.id);

		const messages = chat.message;
		//TODO clear message when u have a user blocked
		const history: Message[] = [];
		for (const message of messages) {
			history.push(message);
		}
		return history;
	}

	async getMessagesbyName(name: string) {
		const chat = await this.getChatByName(name);

		const messages = chat.message;
		//TODO clear message when u have a user blocked
		const history: Message[] = [];
		for (const message of messages) {
			history.push(message);
		}
		return history;
	}

	async ban(id: number, login: string, admin: User, time: Date) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});

		if (!participate)
			return console.log("L'utilisateur ne peut pas être banni car il n'est pas dans le chat !");
		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.admin)
			return console.log("L'utilisateur ne peut pas bannir car il n'est pas admin du chat !");
		if (participate.admin || participate.owner)
			return console.log("L'utilisateur ne peut pas bannir un admin !");

		participate.role = UserStatus.BAN;
		if (time)
			participate.timestamp = time;

		await this.participateRepository.save(participate);
		console.log(user.login + ' has been banned');
	}

	async active(id: number, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});

		if (!participate)
			return console.log("L'utilisateur ne peut pas être débanni/démute car il n'est pas dans le chat !");
		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.admin)
			return console.log("L'utilisateur ne peut pas débannir/démute car il n'est pas admin du chat !");

		participate.timestamp = null;
		participate.role = UserStatus.ACTIVE;

		await this.participateRepository.save(participate);
		console.log(user.login + ' unbanned or unmuted');
	}

	async mute(id: number, login: string, admin: User, time: Date) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});
		if (!participate)
			return console.log("L'utilisateur ne peut pas être mute car il n'est pas dans le chat !");
		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.admin)
			return console.log("L'utilisateur ne peut pas mute car il n'est pas admin du chat !");
		if (participate.admin || participate.owner)
			return console.log("L'utilisateur ne peut pas mute un admin !");

		participate.role = UserStatus.MUTE;
		if (time)
			participate.timestamp = time;

		await this.participateRepository.save(participate);
		console.log(user.login + ' mute');
	}

	async setAdmin(id: number, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});
		if (!participate)
			return console.log("L'utilisateur ne peut pas être admin car il n'est pas dans le chat !");

		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.owner)
			return console.log("L'utilisateur ne peut pas rendre qqn admin car il n'est pas owner du chat !");
		if (participate.admin || participate.owner)
			return console.log("L'utilisateur ne peut pas rendre admin un admin !");

		participate.admin = true;
		await this.participateRepository.save(participate);
		console.log(user.login + ' is now an admin');
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

	async getUsersInChannel(channelId: number) {
		const chat = await this.chatRepository.findOne({ id: channelId });

		const listParticipateCard = await this.participateRepository.find({
			where: [{ chat: chat }],
			relations: ['user', 'chat'],
		});
		return listParticipateCard;
	}

	async chatExist(channelName: string) {
		const chat = await this.chatRepository.findOne({ name: channelName });
		if (chat)
			return false;
		return true;
	}

	async getIsAdmin(channelId: number, user: User) {
		const chat = await this.chatRepository.findOne({ id: channelId });
		const admin = await this.userRepository.findOne({ login: user.login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});

		if (participate.admin)
			return true;
		return false;
	}

}
