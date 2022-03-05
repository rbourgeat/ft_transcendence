import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';

import { GameService } from 'src/game/game.service';
import { CreateGameDto } from 'src/game/dto/game.dto';

@ApiTags('Games') //Create a category on swagger
@Controller('api/game')
export class GameController {
    constructor(
        private readonly gameService: GameService
    ) { }

    @ApiOperation({ summary: 'Retrieve all games data' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Data received' }) //answer sent back
    @Get()
    getAllGames() {
        return this.gameService.getAllGames();
    }

    /**
    **  Save a new game to db
    **/

    @ApiOperation({ summary: 'Create a new game' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Game creation suceed' }) //answer sent back
    @ApiConflictResponse({ description: 'Game already exist' }) //not working atm
    @Post()
    async createGame(@Body() game: CreateGameDto) {
        console.log('Create game: ' + game.login1 + 'vs' + game.login2)
        return this.gameService.createGame(game);
    }

}
