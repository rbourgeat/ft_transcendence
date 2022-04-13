import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getConnection } from 'typeorm';

import { CreateGameDto } from 'src/game/dto/game.dto';
import { Game } from 'src/game/entity/game.entity';
import { UserService } from '../user/user.service';
import { UsersRepository } from 'src/user/user.repository';
import { User } from 'src/user/entity/user.entity';
import { UserEvent } from 'src/user/user.event';


@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game)
		private gameRepository: Repository<Game>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private userService: UserService,
		private readonly userEvent: UserEvent,
	) { }

	getAllGames() {
		return this.gameRepository.find();
	}

	async updateStats(user: User, hasWin: boolean) {
		hasWin ? user.points += 100 : user.points -= 50;
		hasWin ? user.xp += 100 : user.xp += 50;
		hasWin ? user.total_wins += 1 : user.total_loss += 1;
		user.total_games += 1;
		if (user.xp >= ((2 ** (user.level - 1)) * 100)) {
			user.level += 1;
			user.xp = 0;
		}
		user.percent_to_next_lvl = ((user.xp / ((2 ** (user.level - 1)) * 100)) * 100)
		user.win_loss_ration = (user.total_wins) / (user.total_games) * 100;
		await this.userRepository.save(user);
	}

	async updateAllRanks() {
		let allUsers = await this.userRepository.createQueryBuilder("user").orderBy("user.points", "DESC").getMany();
		allUsers.forEach((user: User, index: 1) => {
			user.rank = index + 1;
			console.log(user.login + " new data is:" + " rank:" + user.rank + "points:" + user.points + " level: " + user.level + " xp:" + user.xp + " %lvl:" + user.percent_to_next_lvl);
			this.userRepository.save(user);
		});
	}

	async triggerGameAchievement(winner: User, loser: User) {
		await this.userEvent.achievementFirstGame(winner);
		await this.userEvent.achievementFirstGame(loser);

		await this.userEvent.achievement1000Game(winner);
		await this.userEvent.achievement1000Game(loser);

		await this.userEvent.achievement5Row(winner);
		await this.userEvent.achievement5Row(loser);
	}

	async createGame(winner_login: string, loser_login: string, winner_points: number, loser_points: number) {
		const winner = await this.userService.getUserByLogin(winner_login);
		const loser = await this.userService.getUserByLogin(loser_login);

		await this.updateStats(winner, true);
		await this.updateStats(loser, false);
		await this.updateAllRanks();

		if (winner && loser) {
			const newGame = await this.gameRepository.create({
				winner: winner_login,
				loser: loser_login,
				winner_score: winner_points,
				loser_score: loser_points,
				players: [winner, loser]
			});
			await this.gameRepository.save(newGame);

			await this.triggerGameAchievement(winner, loser);

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
		return user.games.reverse();
	}
}
