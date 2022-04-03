import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FtStrategy } from './ft.strategy';
import { Auth42Controller } from './42auth.controller';
import { SessionSerializer } from './session.serializer';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from 'src/user/user.repository';

@Module({
    imports: [
        UserModule,
        AuthModule,
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
    controllers: [Auth42Controller],
    providers: [ConfigService, FtStrategy, SessionSerializer, AuthService, UsersRepository]
})
export class Auth42Module { }