import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getConnection } from 'typeorm';

import { CreateGameDto } from 'src/game/dto/game.dto';
import { Game } from 'src/game/entity/game.entity';
import { UserService } from '../user/user.service';
import { UsersRepository } from 'src/user/user.repository';
import { User } from 'src/user/entity/user.entity';


@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game)
		private gameRepository: Repository<Game>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private userService: UserService,
	) { }

	getAllGames() {
		return this.gameRepository.find();
	}

	async createGame(winner_login: string, loser_login: string, winner_points: number, loser_points: number) {
		const winner_user = await this.userService.getUserByLogin(winner_login);
		const loser_user = await this.userService.getUserByLogin(loser_login);
		if (winner_user && loser_user) {
			const newGame = await this.gameRepository.create({
				winner: winner_login,
				loser: loser_login,
				winner_score: winner_points,
				loser_score: loser_points,
				players: [winner_user, loser_user]
			});
			await this.gameRepository.save(newGame);
			return newGame;
		}
		else
			return;
	}

	async getGames(login: string) {
		const user = await this.userRepository.findOne({
			relations: ['games'],
			where: { login: login }
		});
		const games = user.games;
		return games;
	}
}
