import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Request, Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
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

    @ApiOperation({ summary: 'Returns game history specific user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get(':login/history')
    getGames(@Param('login') login: string, @Request() reqq) {
        console.log('get game history of user' + login);
        return this.gameService.getGames(login);
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
