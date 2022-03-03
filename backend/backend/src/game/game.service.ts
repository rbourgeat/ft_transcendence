import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './game.dto';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>
    ) { }

    getAllGames() {
        return this.gameRepository.find();
    }

    async createGame(game: CreateGameDto) {
        const newGame = await this.gameRepository.create(game);
        await this.gameRepository.save(newGame);
        return newGame;
    }
    
}