import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity'
import { ChatGateway } from './chat.gateway';
import { User } from 'src/user/entity/user.entity';
import { Message } from 'src/chat/message/entity/message.entity';
import { Participate } from 'src/participate/participate.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { UsersRepository } from 'src/user/user.repository';
import { UserRelation } from 'src/user/entity/friend-request.entity';
import { Achievement } from 'src/user/entity/achievement.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Chat]),
        TypeOrmModule.forFeature([Message]),
        TypeOrmModule.forFeature([Participate]),
        TypeOrmModule.forFeature([UsersRepository]),
        TypeOrmModule.forFeature([UserRelation]),
        TypeOrmModule.forFeature([Achievement]),
        AuthModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
                },
            }),
        }),
    ],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway, AuthService, UserService],
    exports: [ChatService, AuthService]
})
export class ChatModule { }
