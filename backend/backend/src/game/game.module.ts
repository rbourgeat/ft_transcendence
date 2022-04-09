import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { GameController } from 'src/game/game.controller';
import { GameService } from 'src/game/game.service';
import { Game } from 'src/game/entity/game.entity'
import { GameGateway } from './game.gateway';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entity/user.entity'
import { UserEvent } from '../user/user.event';
import { UserRelation } from '../user/entity/friend-request.entity';
import { UsersRepository } from '../user/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Game]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([UserRelation])],
    controllers: [GameController],
    providers: [GameService, GameGateway, UserService, UserEvent, UserRelation, UsersRepository],
    exports: [GameService]
})
export class GameModule { }
