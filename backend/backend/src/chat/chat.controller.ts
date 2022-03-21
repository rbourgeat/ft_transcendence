import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, PasswordChatDto } from './dto/chat.dto';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import CreateMessageDto from './dto/message.dto';

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

    ///TEST WORKING !
    @ApiOperation({ summary: 'Create a new message' })
    @ApiOkResponse({ description: 'Message creation suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('message')
    async createMessage(@Body() message: CreateMessageDto, @Req() req: RequestWithUser) {
        return this.chatService.createMessage(message, req.user);
    }

    @ApiOperation({ summary: 'Join a chat' })
    @ApiOkResponse({ description: 'Join chat suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('join')
    async joinChat(@Body() chat: CreateChatDto, @Req() req: RequestWithUser) {
        return this.chatService.joinChat(chat, req.user);
    }

    /**
    **  Save a new chat to db
    **/

    @ApiOperation({ summary: 'Create a new chat' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Chat creation suceed' }) //answer sent back
    @ApiConflictResponse({ description: 'Chat already exist' }) //not working atm
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async createChat(@Body() chat: CreateChatDto, @Req() req: RequestWithUser) {
        //console.log('Create chat: ' + chat)
        return this.chatService.createChat(chat, req.user);
    }

    @ApiOperation({ summary: 'Remove a chat' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Chat removed successfully' }) //answer sent back
    @ApiConflictResponse({ description: 'Chat already removed' }) //not working atm
    @Delete()
    async removeChat(@Body() id: number) {
        console.log('Remove chat: ' + id)
        return this.chatService.removeChat(id);
    }

    @ApiOperation({ summary: 'Retrieve message history' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Messages load successfully' }) //answer sent back
    @ApiConflictResponse({ description: 'Fail' }) //not working atm
    @Get(':id/messages')
    async getMessages(@Body() id: number) {
        console.log('Retrieve message history from chat: ' + id)
        return this.chatService.getMessages(id);
    }

    @ApiOperation({ summary: 'Adding new member' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'new member added' }) //answer sent back
    @ApiConflictResponse({ description: 'member already member' }) //not working atm
    @Post(':id/add/:member')
    async addMember(@Param('id') id: number, @Param('member') member: string) {
        console.log('Adding member')
        return this.chatService.addMember(id, String(member), "member");
    }

    @ApiOperation({ summary: 'Remove member' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'member removed' }) //answer sent back
    @ApiConflictResponse({ description: 'member already removed' }) //not working atm
    @Post(':id/remove/:member')
    async removeMember(@Param('id') id: number, @Param('member') member: string) {
        console.log('Remove member')
        return this.chatService.removeMember(id, String(member), "member");
    }

    @ApiOperation({ summary: 'Adding new admin' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'new admin added' }) //answer sent back
    @ApiConflictResponse({ description: 'admin already admin' }) //not working atm
    @Post('setAdmin')
    async setAdmin(@Body() idChat: number, @Body() user: string, @Req() req: RequestWithUser) {
        console.log(req.user + 'set admin' + user + ' to chat ' + idChat)
        return this.chatService.setAdmin(idChat, user, req.user);
    }

    @ApiOperation({ summary: 'Ban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user banned' }) //answer sent back
    @ApiConflictResponse({ description: 'user already banned' }) //not working atm
    @Post('ban')
    async ban(@Body() idChat: number, @Body() user: string, @Req() req: RequestWithUser, @Body() time: Date) {
        console.log(req.user + ' ban ' + user + ' in chat' + idChat)
        return this.chatService.ban(idChat, user, req.user, time);
    }

    @ApiOperation({ summary: 'Unban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user unbanned' }) //answer sent back
    @ApiConflictResponse({ description: 'user not banned' }) //not working atm
    @Post('unban')
    async unban(@Body() idChat: number, @Body() user: string, @Req() req: RequestWithUser) {
        console.log(req.user + ' unban ' + user + ' in chat' + idChat)
        return this.chatService.active(idChat, user, req.user);
    }

    @ApiOperation({ summary: 'Mute user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user mute' }) //answer sent back
    @ApiConflictResponse({ description: 'user already mute' }) //not working atm
    @Post('mute')
    async mute(@Body() idChat: number, @Body() user: string, @Req() req: RequestWithUser, @Body() time: Date) {
        console.log(req.user + ' mute ' + user + ' in chat' + idChat)
        return this.chatService.ban(idChat, user, req.user, time);
    }

    @ApiOperation({ summary: 'Unmute user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user unmute' }) //answer sent back
    @ApiConflictResponse({ description: 'user not mute' }) //not working atm
    @Post('unmute')
    async unmute(@Body() idChat: number, @Body() user: string, @Req() req: RequestWithUser) {
        console.log(req.user + ' unmute ' + user + ' in chat' + idChat)
        return this.chatService.active(idChat, user, req.user);
    }

    @ApiOperation({ summary: 'set chat password' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Chat password done' }) //answer sent back
    @ApiConflictResponse({ description: 'Chat password error' }) //not working atm
    @Post('password')
    async password(@Body() idChat: number, @Req() req: RequestWithUser, @Body() password: PasswordChatDto) {
        console.log(' set password to chat ' + idChat)
        return this.chatService.password(idChat, req.user, password);
    }

}
