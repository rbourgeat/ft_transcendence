import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';

import { GameService } from 'src/game/game.service';
import { CreateGameDto } from 'src/game/dto/game.dto';

@ApiTags('Games')
@Controller('api/game')
export class GameController {
    constructor(
        private readonly gameService: GameService
    ) { }

    @ApiOperation({ summary: 'Retrieve all games data' })
    @ApiOkResponse({ description: 'Data received' })
    @Get()
    getAllGames() {
        return this.gameService.getAllGames();
    }

    /**
    **  Save a new game to db
    **/

    // @ApiOperation({ summary: 'Create a new game' })
    // @ApiOkResponse({ description: 'Game creation suceed' })
    // @ApiConflictResponse({ description: 'Game already exist' })
    // @Post()
    // async createGame(@Body() game: CreateGameDto) {
    //     console.log('Create game: ' + game.login1 + 'vs' + game.login2)
    //     return this.gameService.createGame(game);
    // }

}
