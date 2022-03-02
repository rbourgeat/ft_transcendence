import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from '../jwt.strategy';
import { Auth42Controller } from './42auth.controller';
import { Auth42Service } from './42auth.service';
import { Auth42Strategy } from './42auth.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule,
    ],
    providers: [Auth42Service, Auth42Strategy, JwtStrategy],
    controllers: [Auth42Controller]
})
export class Auth42Module { }
