import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, ChatDto } from './dto/chat.dto';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { CreateMessageDto, SendMessageToChatDto } from './dto/message.dto';

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

    @ApiOperation({ summary: 'Create a new message [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Message creation suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('message')
    async createMessage(@Body() message: CreateMessageDto, @Req() req: RequestWithUser) {
        return this.chatService.createMessage(message, req.user);
    }

    @ApiOperation({ summary: 'Join a chat [jwt-protected]' })
    @ApiOkResponse({ description: 'Join chat suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('join')
    async joinChat(@Body() chat: CreateChatDto, @Req() req: RequestWithUser) {
        return this.chatService.joinChat(chat, req.user);
    }


    @ApiOperation({ summary: 'Send a message to a chat [jwt-protected]' })
    @ApiOkResponse({ description: 'message sent' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('sendMessage')
    async sendMessage(@Body() message: SendMessageToChatDto, @Req() req: RequestWithUser) {
        return this.chatService.sendMessage(message, req.user);
    }

    @ApiOperation({ summary: 'Quit a chat [jwt-protected]' })
    @ApiOkResponse({ description: 'chat quit' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('quit')
    async quitChat(@Body() chat: CreateChatDto, @Req() req: RequestWithUser) {
        return this.chatService.quitChat(chat, req.user);
    }

    @ApiOperation({ summary: 'Create a new chat [jwt-protected]' })
    @ApiOkResponse({ description: 'Chat creation suceed' })
    @ApiConflictResponse({ description: 'Chat already exist' })
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async createChat(@Body() chat: CreateChatDto, @Req() req: RequestWithUser) {
        return this.chatService.createChat(chat, req.user);
    }

    @ApiOperation({ summary: 'Retrieve message history' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Messages load successfully' }) //answer sent back
    @ApiConflictResponse({ description: 'Fail' }) //not working atm
    @Get(':id/messages')
    async getMessages(@Body() id: number) {
        console.log('Retrieve message history from chat: ' + id)
        return this.chatService.getMessages(id);
    }


    @ApiOperation({ summary: 'Adding new admin' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'new admin added' }) //answer sent back
    @ApiConflictResponse({ description: 'admin already admin' }) //not working atm
    @Post('setAdmin')
    async setAdmin(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(req.user + 'set admin' + chat.user + ' to chat ' + chat.idChat)
        return this.chatService.setAdmin(chat.idChat, chat.user, req.user);
    }

    @ApiOperation({ summary: 'Ban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user banned' }) //answer sent back
    @ApiConflictResponse({ description: 'user already banned' }) //not working atm
    @Post('ban')
    async ban(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(req.user + ' ban ' + chat.user + ' in chat' + chat.idChat)
        return this.chatService.ban(chat.idChat, chat.user, req.user, chat.time);
    }

    @ApiOperation({ summary: 'Unban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user unbanned' }) //answer sent back
    @ApiConflictResponse({ description: 'user not banned' }) //not working atm
    @Post('unban')
    async unban(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(req.user + ' unban ' + chat.user + ' in chat' + chat.idChat)
        return this.chatService.active(chat.idChat, chat.user, req.user);
    }

    @ApiOperation({ summary: 'Mute user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user mute' }) //answer sent back
    @ApiConflictResponse({ description: 'user already mute' }) //not working atm
    @Post('mute')
    async mute(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(req.user + ' mute ' + chat.user + ' in chat' + chat.idChat)
        return this.chatService.ban(chat.idChat, chat.user, req.user, chat.time);
    }

    @ApiOperation({ summary: 'Unmute user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user unmute' }) //answer sent back
    @ApiConflictResponse({ description: 'user not mute' }) //not working atm
    @Post('unmute')
    async unmute(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(req.user + ' unmute ' + chat.user + ' in chat' + chat.idChat)
        return this.chatService.active(chat.idChat, chat.user, req.user);
    }

    @ApiOperation({ summary: 'set chat password' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Chat password done' }) //answer sent back
    @ApiConflictResponse({ description: 'Chat password error' }) //not working atm
    @Post('password')
    async password(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(' set password to chat ' + chat.idChat)
        return this.chatService.password(chat.idChat, req.user, chat.password);
    }

}
