import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { GameController } from 'src/game/game.controller';
import { GameService } from 'src/game/game.service';
import { Game } from 'src/game/entity/game.entity'
import { GameGateway } from './game.gateway';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entity/user.entity'
import { UserRelation } from '../user/entity/friend-request.entity';
import { UsersRepository } from '../user/user.repository';
import { Achievement } from 'src/user/entity/achievement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Game, User, UserRelation, Achievement])],
    controllers: [GameController],
    providers: [GameService, GameGateway, UserService, UserRelation, UsersRepository],
    exports: [GameService]
})
export class GameModule { }
