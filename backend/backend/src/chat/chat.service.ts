import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { CreateChatDto } from './dto/chat.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Chat)
		private chatRepository: Repository<Chat>
	) { }

	getAllChats() {
		return this.chatRepository.find();
	}

	async createChat(chat: CreateChatDto) {
		const newChat = await this.chatRepository.create(chat);
		await this.chatRepository.save(newChat);

		var init = false;
		var login = chat.owner;
		const u = await this.userRepository.findOne({ login });
		if (!u.chats) {
			u.chats = [42];
			init = true;
		}
		u.chats.push(newChat.id);
		if (init)
			u.chats.splice(0, 1);
		this.userRepository.update({ login }, {
			chats: u.chats
		});

		// pas fini d'ajouter les membres si il y en a

		return newChat;
	}

	async removeChat(id: number) {
		const chat = await this.chatRepository.findOne({ id });
		this.chatRepository.delete(chat);
	}

	async addMember(id: number, login: string, to: string) {
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
	}

	async removeMember(id: number, login: string, to: string) {
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
	}

}
