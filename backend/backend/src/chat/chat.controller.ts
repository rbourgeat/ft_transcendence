import { Request, Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, ChatDto } from './dto/chat.dto';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { CreateMessageDto, SendMessageToChatDto } from './dto/message.dto';
import { UserDto } from '../user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@ApiTags('Chats') //Create a category on swagger
@Controller('api/chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private userService: UserService
    ) { }

    @ApiOperation({ summary: 'Retrieve all chats data' })
    @ApiOkResponse({ description: 'Data received' })
    @Get()
    getAllChats() {
        return this.chatService.getAllChats();
    }

    @ApiOperation({ summary: 'Retrieve all channels from a user [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('joinedChannels')
    async getChatsFromUser(@Req() req: RequestWithUser) {
        return this.chatService.getChatsFromUser(req.user);
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
        console.log(req.user.login + ' tries to join the chat:' + chat.name);
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
    async quitChat(@Body() chat: ChatDto, @Request() req) {
        return this.chatService.quitChat(chat.idChat, req.user);
    }

    @ApiOperation({ summary: 'Create a new chat [jwt-protected]' })
    @ApiOkResponse({ description: 'Chat creation suceed' })
    @ApiConflictResponse({ description: 'Chat already exist' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('new')
    async createChat(@Body() chat: CreateChatDto, @Req() req: RequestWithUser) {
        return this.chatService.createChat(chat, req.user);
    }

    @ApiOperation({ summary: 'Create a new direct message [jwt-protected]' })
    @ApiOkResponse({ description: 'Direct message creation suceed' })
    @ApiConflictResponse({ description: 'Direct message already exist' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('/:userLogin/direct')
    async createDirectMessage(@Param('userLogin') user: string, @Req() req: RequestWithUser) {
        const user2 = await this.userService.getUserByLogin(user);
        return await this.chatService.createDirectMessage(req.user, user2);
    }

    @ApiOperation({ summary: 'Retrieve message history' })
    @ApiOkResponse({ description: 'Messages load successfully' })
    @ApiConflictResponse({ description: 'Fail' })
    @Get(':idChat/messages')
    async getMessages(@Param('idChat') id: number) {
        console.log('Retrieve message history from chat: ' + id)
        return this.chatService.getMessagesById(id);
    }


    @ApiOperation({ summary: 'Adding new admin' })
    @ApiOkResponse({ description: 'new admin added' })
    @ApiConflictResponse({ description: 'admin already admin' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('setAdmin')
    async setAdmin(@Body() chat: ChatDto, @Request() req) {
        console.log(req.user.login + ' set admin ' + chat.user + ' to chat ' + chat.idChat)
        return this.chatService.setAdmin(chat.idChat, chat.user, req.user);
    }

    @ApiOperation({ summary: 'Ban user' })
    @ApiOkResponse({ description: 'user banned' })
    @ApiConflictResponse({ description: 'user already banned' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('ban')
    async ban(@Body() chat: ChatDto, @Request() req) {
        console.log(req.user.login + ' ban ' + chat.user + ' in chat' + chat.idChat)
        return this.chatService.ban(chat.idChat, chat.user, req.user, chat.time);
    }

    @ApiOperation({ summary: 'Unban user' })
    @ApiOkResponse({ description: 'user unbanned' })
    @ApiConflictResponse({ description: 'user not banned' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('unban')
    async unban(@Body() chat: ChatDto, @Request() req) {
        console.log(req.user.login + ' unban ' + chat.user + ' in chat' + chat.idChat)
        return this.chatService.active(chat.idChat, chat.user, req.user);
    }

    @ApiOperation({ summary: 'Mute user' })
    @ApiOkResponse({ description: 'user mute' })
    @ApiConflictResponse({ description: 'user already mute' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('mute')
    async mute(@Body() chat: ChatDto, @Request() req) {
        console.log(req.user.login + ' mute ' + chat.user + ' in chat' + chat.idChat)
        // return this.chatService.mute(chat.idChat, chat.user, req.user, chat.time);
    }

    @ApiOperation({ summary: 'Unmute user' })
    @ApiOkResponse({ description: 'user unmute' })
    @ApiConflictResponse({ description: 'user not mute' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('unmute')
    async unmute(@Body() chat: ChatDto, @Request() req) {
        console.log(req.user + ' unmute ' + chat.user + ' in chat' + chat.idChat)
        // return this.chatService.active(chat.idChat, chat.user, req.user);
    }

    @ApiOperation({ summary: 'set chat password' })
    @ApiOkResponse({ description: 'Chat password done' })
    @ApiConflictResponse({ description: 'Chat password error' })
    @Post('password')
    async password(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(' set password to chat ' + chat.idChat + ' to:' + chat.password)
        return this.chatService.password(chat.idChat, req.user, chat.password);
    }

    @ApiOperation({ summary: 'setting chat to private' })
    @ApiOkResponse({ description: 'Chat now private' })
    @ApiConflictResponse({ description: 'Chat can\'t being private' })
    @Post('setPrivate')
    async setPrivate(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(' set chat ' + chat.idChat + ' to private')
        return this.chatService.setPrivate(chat.idChat, req.user);
    }

    @ApiOperation({ summary: 'setting chat to public' })
    @ApiOkResponse({ description: 'Chat now public' })
    @ApiConflictResponse({ description: 'Chat can\'t being public' })
    @Post('setPublic')
    async setPublic(@Body() chat: ChatDto, @Req() req: RequestWithUser) {
        console.log(' set chat ' + chat.idChat + ' to public')
        return this.chatService.setPublic(chat.idChat, req.user);
    }

    @ApiOperation({ summary: 'get user of a channel' })
    @ApiOkResponse({ description: 'Suceed' })
    @Get(':channelId/users')
    async getUsersInChannel(@Param('channelId') channelId: number) {
        return this.chatService.getUsersInChannel(channelId);
    }

    @ApiOperation({ summary: 'Boolean to know if that chat exist [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Get(':channelName/exist')
    async getChatExist(@Param('channelName') channelName: string, @Request() req) {
        return (this.chatService.chatExist(channelName));
    }

    @ApiOperation({ summary: 'Boolean to know if requesting user is admin [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('/isAdminIn/:channelId')
    async getIsAdmin(@Param('channelId') channelId: number, @Request() req) {
        return this.chatService.getIsAdmin(channelId, req.user);
    }

    @ApiOperation({ summary: 'Boolean to know if requesting user is muted [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('/isMutedIn/:channelId')
    async getIsMuted(@Param('channelId') channelId: number, @Request() req) {
        return this.chatService.getIsMuted(channelId, req.user);
    }

    @ApiOperation({ summary: 'Boolean to know if requesting user is banned [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('/isBannedIn/:channelId')
    async getIsBanned(@Param('channelId') channelId: number, @Request() req) {
        return this.chatService.getIsBanned(channelId, req.user);
    }

    @ApiOperation({ summary: 'Boolean to know if requesting user is admin [jwt-protected + for swagger test only]' })
    @ApiOkResponse({ description: 'Suceed' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('joinableChannels')
    async joinableChannels(@Request() req) {
        return this.chatService.joinableChannels(req.user);
    }
}
