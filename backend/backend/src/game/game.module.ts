import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { GameController } from 'src/game/game.controller';
import { GameService } from 'src/game/game.service';
import { Game } from 'src/game/entity/game.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService]
})
export class GameModule { }
