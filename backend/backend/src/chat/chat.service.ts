import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, QueryRunner } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { CreateChatDto } from './dto/chat.dto';
import { User } from 'src/user/entity/user.entity';
import { Message } from 'src/chat/message/entity/message.entity'
import CreateMessageDto from './dto/message.dto';
import { Participate, UserStatus } from 'src/participate/participate.entity';

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
		private participateRepository: Repository<Participate>
	) { }

	getAllChats() {
		return this.chatRepository.find({ relations: ['participates'] });
	}

	async getChatByName(name: string) {
		console.log('we search for chat: ' + name);
		//const chat = await this.chatRepository.findOne({ where: { name: name } })
		const chat = await this.chatRepository.findOne({ name: name });
		if (chat) {
			return chat;
		}
		else {
			console.log(chat + ' not found');
			return;
		}
	}

	async createChat(chat: CreateChatDto, user: User) {
		//check if channel with that name doest not already exist
		if (await this.getChatByName(chat.name)) {
			console.log('error: ' + chat + ' already exist');
			return;
		}
		console.log('create owner of channel');
		//spawn new participate (channel owner)
		const newParticipate = await this.participateRepository.create(
			{
				user: user,
				admin: true
			}
		);
		await this.participateRepository.save(newParticipate);
		console.log('create owner done: ' + newParticipate.user.login);

		//then create the new channel
		console.log('create channel');
		const newChat = await this.chatRepository.create(
			{
				...chat,
				participates: [newParticipate] //enough to save the relation :)
			}
		);
		await this.chatRepository.save(newChat);
		console.log('create channel done');

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

	async removeChat(id: number) {
		const chat = await this.chatRepository.findOne({ id });
		this.chatRepository.delete(chat);
	}

	async joinChat(chat: CreateChatDto, user: User) {
		let chatT = await this.getChatByName(chat.name);
		if (chatT) {
			const newParticipate = await this.participateRepository.create(
				{
					user: user,
					chat: chatT //possible solution :D
				}
			);
			await this.participateRepository.save(newParticipate);
			console.log('create new channel member: ' + newParticipate.user.login);

			//need to find a way how to add a participate join an already existing channel.

			//2 first try got this error :  ERROR [ExceptionsHandler] Cannot query across one-to-many for property participates
			//await this.chatRepository.update(chatT, newParticipate); //not working
			//await this.chatRepository.update(chatT.id, { participates: [newParticipate] }); //not working

			//not working
			/*
			await getConnection()
				.createQueryBuilder()
				.update(Chat)
				.set({
					participates: [newParticipate]
				})
				.where("id = :id", { id: chatT.id })
				.execute();
			*/

			//not working
			//let queryRunner: QueryRunner;
			//let newChat = await queryRunner.manager.update(Chat, chatT.id, { participates: [newParticipate] });

			return;
		}
		else {
			console.log(chat + ' not found');
			return;
		}
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

	async addMember(id: number, login: string, to: string) {
		/*
		const chat = await this.chatRepository.findOne({ id });
		var init = false;
		const u = await this.userRepository.findOne({ login });

		if (!u)
			return; // comment générer une erreur ???

		if (to == "member")
		{
			if (!chat.members) {
				chat.members = [""];
				init = true;
			}
			chat.members.push(u.login);
			if (init)
				chat.members.splice(0, 1);
			this.chatRepository.update({ id }, {
				members: chat.members
			});
		}
		else if (to == "admin")
		{
			if (!chat.admins) {
				chat.admins = [""];
				init = true;
			}
			chat.admins.push(u.login);
			if (init)
				chat.admins.splice(0, 1);
			this.chatRepository.update({ id }, {
				admins: chat.admins
			});
		}
		else if (to == "ban")
		{
			if (!chat.bans) {
				chat.bans = [""];
				init = true;
			}
			chat.bans.push(u.login);
			if (init)
				chat.bans.splice(0, 1);
			this.chatRepository.update({ id }, {
				bans: chat.bans
			});
		}
		else if (to == "temp_ban")
		{
			if (!chat.temp_bans) {
				chat.temp_bans = [""];
				init = true;
			}
			chat.temp_bans.push(u.login);
			if (init)
				chat.temp_bans.splice(0, 1);
			this.chatRepository.update({ id }, {
				temp_bans: chat.temp_bans
			});
		}
		*/
	}

	async removeMember(id: number, login: string, to: string) {
		/*
		const chat = await this.chatRepository.findOne({ id });

		if (to == "member")
		{
			for (var i = 0; i < chat.members.length; i++)
				if (chat.members[i] === login)
					chat.members.splice(i, 1);
			this.chatRepository.update({ id }, {
				members: chat.members
			});
		}
		else if (to == "admin")
		{
			for (var i = 0; i < chat.admins.length; i++)
				if (chat.admins[i] === login)
					chat.admins.splice(i, 1);
			this.chatRepository.update({ id }, {
				admins: chat.admins
			});
		}
		else if (to == "ban")
		{
			for (var i = 0; i < chat.bans.length; i++)
				if (chat.bans[i] === login)
					chat.bans.splice(i, 1);
			this.chatRepository.update({ id }, {
				bans: chat.bans
			});
		}
		else if (to == "temp_ban")
		{
			for (var i = 0; i < chat.temp_bans.length; i++)
				if (chat.temp_bans[i] === login)
					chat.temp_bans.splice(i, 1);
			this.chatRepository.update({ id }, {
				temp_bans: chat.temp_bans
			});
		}
	*/
	}

	async ban(id: number, login: string, admin: User)
    {
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
        console.log(user + ' banned');
		return user.participate.find(e => e.chat == chat);
    }

	async unban(id: number, login: string, admin: User)
    {
        const chat = await this.chatRepository.findOne({ id });
        const user = await this.userRepository.findOne({ login });
        const participate = chat.participates.find(e => e == user.participate.find(e => e.chat == chat));
		if (!participate)
			return console.log("L'utilisateur ne peut pas être débanni car il n'est pas dans le chat !");
		if (!admin.participate.find(e => e.chat == chat).admin)
			return console.log("L'utilisateur ne peut pas débannir car il n'est pas admin du chat !");

		user.participate.find(e => e.chat == chat).role = UserStatus.ACTIVE;
		
        await this.userRepository.save(user);
        console.log(user + ' unbanned');
		return user.participate.find(e => e.chat == chat);
    }
}
