import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './game.entity'
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService]
})
export class GameModule { }
