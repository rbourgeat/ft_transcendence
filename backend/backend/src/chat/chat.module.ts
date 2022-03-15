import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity'
import { ChatGateway } from './chat.gateway';
import { User } from 'src/user/entity/user.entity';
import { Message } from 'src/chat/message/entity/message.entity';
import { Participate } from 'src/participate/participate.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Chat]),
        TypeOrmModule.forFeature([Message]),
        TypeOrmModule.forFeature([Participate])
    ],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
    exports: [ChatService]
})
export class ChatModule { }
