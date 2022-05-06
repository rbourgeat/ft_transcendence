import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { UserRelation } from 'src/user/entity/friend-request.entity';
import { UserService } from 'src/user/user.service';
//import * as bcrypt from 'bcrypt';
import * as argon2 from "argon2";
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
		private readonly authenticationService: AuthService,
		private readonly userService: UserService,
		@InjectRepository(UserRelation)
		private readonly userRelationRepository: Repository<UserRelation>,
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

		//console.log(listParticipateCard);
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
		const chat = await this.chatRepository.findOne({ name: name });
		if (chat)
			return chat;
		else
			return;
	}

	async getChatById(id: number) {
		const chat = await this.chatRepository.findOne({ id: id });
		if (chat)
			return chat;
		else
			return;
	}

	async createChat(chat: CreateChatDto, user: User) {

		if (await this.getChatByName(chat.name) || chat.name.startsWith("direct_"))
			throw new HttpException('Forbidden name', HttpStatus.CONFLICT);

		const newParticipate = await this.participateRepository.create(
			{
				user: user,
				admin: true,
				owner: true,
				login: user.login42,
			}
		);
		await this.participateRepository.save(newParticipate);

		console.log(chat.password);
		chat.password = await argon2.hash(chat.password);
		console.log(chat.password);
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
		if (user1.id == user2.id) {
			throw new HttpException('You can\'t start a conversation with yourself', HttpStatus.CONFLICT);
		}
		if (await this.getChatByName("direct_" + user1.id + "_" + user2.id) ||
			await this.getChatByName("direct_" + user2.id + "_" + user1.id)) {
			throw new HttpException('You can\'t start a conversation with that user', HttpStatus.CONFLICT);
		}
		if (await this.userService.hasBlockedRelation(user1, user2)) {
			throw new HttpException('You can\'t start a conversation with ' + user2.login, HttpStatus.BAD_REQUEST);
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
		const chat = await this.getChatByName(message.channel);
		const participate = await this.participateRepository.findOne({ user: user, chat: chat });
		if (participate.role == UserStatus.BAN || participate.role == UserStatus.MUTE) {
			//return console.log('can\'t send message, you are banned or mute');
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

	async joinChat(chat: CreateChatDto, user: User) {
		const joinedChat = await this.getChatByName(chat.name);

		if (joinedChat) {
			if (joinedChat.public === true && chat.public === false)
				throw new HttpException({ error: 'Tried to join a public channel as private', status: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);

			if(joinedChat.password)
			{
			    const isPasswordMatching = await argon2.verify(
				  joinedChat.password,
				  chat.password
			    );
				if(isPasswordMatching)
				{
				const chatT = await this.getChatByName(chat.name);
				const participate = await this.participateRepository.findOne({ user: user, chat: chatT });
				if (!participate) {
					const newParticipate = await this.participateRepository.create(
						{
							user: user,
							chat: joinedChat,
							login: user.login42,
						}
					);
					await this.participateRepository.save(newParticipate);
					return;
				}
				else
                       throw new HttpException({ error: 'Wrong password', status: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);
			}
			else
			{
				const chatT = await this.getChatByName(chat.name);
				const participate = await this.participateRepository.findOne({ user: user, chat: chatT });
				if (!participate) {
					const newParticipate = await this.participateRepository.create(
						{
							user: user,
							chat: joinedChat,
							login: user.login42,
						}
					);
					await this.participateRepository.save(newParticipate);
					return;
				}
			}
				}
				else
					throw new HttpException({ error: 'Tried to join a joinded channel', status: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);
			}
		else
			throw new HttpException({ error: 'Channel doesn\'t exist', status: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);
	}

	async quitChat(id: number, user: User) {
		const chatT = await this.chatRepository.findOne({ id });
		const participateToDelete = await this.participateRepository.findOne({ user: user, chat: chatT });
		await this.participateRepository.delete(participateToDelete);
	}

	async getMessagesById(id: number) {
		const chat = await this.chatRepository.findOne({ id });
		const messages = chat.message;
		//TODO clear message when u have a user blocked
		const history: Message[] = [];
		for (const message of messages) {
			history.push(message);
		}
		return history;
	}

	async getMessagesById2(id: number, login: string) {
		const chat = await this.chatRepository.findOne({ id });
		const me = await this.userRepository.findOne({ login });
		//console.log(me.login);
		const messages = chat.message;

		const history: Message[] = [];
		for (const message of messages) {
			if (!(await this.userRelationRepository.findOne({ where: [{ receiver: message.author, creator: me, status: 'blocked' }], relations: ['receiver', 'creator'] })))
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

	async ban(name: string, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ name });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});

		if (!participate)
			// return console.log("L'utilisateur ne peut pas être banni car il n'est pas dans le chat !");
			return;
		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.admin)
			// return console.log("L'utilisateur ne peut pas bannir car il n'est pas admin du chat !");
			return;
		if (participate.admin || participate.owner)
			// return console.log("L'utilisateur ne peut pas bannir un admin !");
			return;

		participate.role = UserStatus.BAN;
		await this.participateRepository.save(participate);
	}

	async active(name: string, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ name });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});

		if (!participate)
			// return console.log("L'utilisateur ne peut pas être débanni/démute car il n'est pas dans le chat !");
			return;

		participate.timestamp = null;
		participate.role = UserStatus.ACTIVE;
		await this.participateRepository.save(participate);
	}

	async mute(name: string, login: string, admin: User, time: Date) {
		const chat = await this.chatRepository.findOne({ name });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});
		if (!participate)
			// return console.log("L'utilisateur ne peut pas être mute car il n'est pas dans le chat !");
			return;
		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.admin)
			// return console.log("L'utilisateur ne peut pas mute car il n'est pas admin du chat !");
			return;
		if (participate.admin || participate.owner)
			// return console.log("L'utilisateur ne peut pas mute un admin !");
			return;

		participate.role = UserStatus.MUTE;
		if (time)
			participate.timestamp = time;
		await this.participateRepository.save(participate);
	}

	async setAdmin(name: string, login: string, admin: User) {
		const chat = await this.chatRepository.findOne({ name });
		const user = await this.userRepository.findOne({ login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: user }]
		});
		if (!participate)
			// return console.log("L'utilisateur ne peut pas être admin car il n'est pas dans le chat !");
			return;

		const adminParticipate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: admin }]
		});
		if (!adminParticipate.owner)
			// return console.log("L'utilisateur ne peut pas rendre qqn admin car il n'est pas owner du chat !");
			return;
		if (participate.admin || participate.owner)
			// return console.log("L'utilisateur ne peut pas rendre admin un admin !");
			return;
		participate.admin = true;
		await this.participateRepository.save(participate);
	}

	async password(id: number, admin: User, password: string) {
		const chat = await this.chatRepository.findOne({ id });
		chat.password = password;
		await this.chatRepository.save(chat);
		return chat;
	}

	async setPrivate(id: number, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		if (!admin.participate.find(e => e.chat == chat).owner)
			// return console.log("L'utilisateur ne peut pas set le chat en privé car il n'est pas owner !");
			return;
		chat.public = false;
		await this.chatRepository.save(chat);
		return chat;
	}

	async setPublic(id: number, admin: User) {
		const chat = await this.chatRepository.findOne({ id });
		if (!admin.participate.find(e => e.chat == chat).owner)
			// return console.log("L'utilisateur ne peut pas set le chat en public car il n'est pas owner !");
			return;
		chat.public = true;
		await this.chatRepository.save(chat);
		return chat;
	}

	async getUsersInChannel(channelId: number) {
		const chat = await this.chatRepository.findOne({ id: channelId });

		const listParticipateCard = await this.participateRepository.find({
			where: [{ chat: chat }],
			relations: ['user', 'chat'],
		});
		return listParticipateCard.sort();
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

	async getIsMuted(channelId: number, user: User) {
		const chat = await this.chatRepository.findOne({ id: channelId });
		const userT = await this.userRepository.findOne({ login: user.login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: userT }]
		});

		if (participate.role == "mute")
			return true;
		return false;
	}

	async getIsBanned(channelId: number, user: User) {
		const chat = await this.chatRepository.findOne({ id: channelId });
		const userT = await this.userRepository.findOne({ login: user.login });
		const participate = await this.participateRepository.findOne({
			where: [{ chat: chat, user: userT }]
		});

		if (participate.role == "ban")
			return true;
		return false;
	}
}
