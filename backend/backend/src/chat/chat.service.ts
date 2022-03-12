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

}
