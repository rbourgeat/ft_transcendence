import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { CreateChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>
    ) { }

    getAllChats() {
        return this.chatRepository.find();
    }

    async createChat(chat: CreateChatDto) {
        const newChat = await this.chatRepository.create(chat);
        await this.chatRepository.save(newChat);
        return newChat;
    }

}
