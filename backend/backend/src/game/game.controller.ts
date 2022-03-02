import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './game.dto';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Games') //Create a category on swagger
@Controller('api/game')
export class GameController {
    constructor(
        private readonly gameService: GameService
    ) { }

    @ApiOperation({ summary: 'Retrieve all games data' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Data received' }) //answer sent back
    @Get()
    getAllUsers() {
        return this.gameService.getAllGames();
    }
    
}
