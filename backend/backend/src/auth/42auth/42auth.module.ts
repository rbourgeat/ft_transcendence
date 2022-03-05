import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { Auth42Strategy } from 'src/auth/42auth/strategy/42auth.strategy';
import { Auth42Controller } from 'src/auth/42auth/42auth.controller';
import { Auth42Service } from 'src/auth/42auth/42auth.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';

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
