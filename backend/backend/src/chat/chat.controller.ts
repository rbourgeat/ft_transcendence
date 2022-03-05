import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/chat.dto';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Chats') //Create a category on swagger
@Controller('api/chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @ApiOperation({ summary: 'Retrieve all chats data' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Data received' }) //answer sent back
    @Get()
    getAllChats() {
        return this.chatService.getAllChats();
    }

    /**
    **  Save a new chat to db
    **/

    @ApiOperation({ summary: 'Create a new chat' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Chat creation suceed' }) //answer sent back
    @ApiConflictResponse({ description: 'Chat already exist' }) //not working atm
    @Post()
    async createChat(@Body() chat: CreateChatDto) {
        console.log('Create chat: ' + chat)
        return this.chatService.createChat(chat);
    }

}
