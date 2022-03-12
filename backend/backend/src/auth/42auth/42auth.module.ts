import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FtStrategy } from './ft.strategy';
import { Auth42Controller } from './42auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
    controllers: [Auth42Controller],
    providers: [ConfigService, FtStrategy, SessionSerializer],
})
export class Auth42Module { }