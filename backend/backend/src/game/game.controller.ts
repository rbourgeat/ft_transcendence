import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { GameService } from 'src/game/game.service';

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

    @ApiOperation({ summary: 'FOR TEST ONLY, TO DELETE LATE' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('CreateCustomResult:login1/:login2')
    createGame(@Param('login1') login: string, @Param('login2') login2: string, @Request() req) {
        return this.gameService.createGame(login, login2, 5, 2, 0);
    }
}
