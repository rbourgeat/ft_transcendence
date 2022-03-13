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

    @ApiOperation({ summary: 'Remove a chat' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Chat removed successfully' }) //answer sent back
    @ApiConflictResponse({ description: 'Chat already removed' }) //not working atm
    @Delete()
    async removeChat(@Body() id: number) {
        console.log('Remove chat: ' + id)
        return this.chatService.removeChat(id);
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
    @Post(':id/add/:admin/admin')
    async addAdmin(@Param('id') id: number, @Param('admin') admin: string) {
        console.log('Adding admin')
        return this.chatService.addMember(id, String(admin), "admin");
    }

    @ApiOperation({ summary: 'Remove admin' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'admin removed' }) //answer sent back
    @ApiConflictResponse({ description: 'admin already removed' }) //not working atm
    @Post(':id/remove/:admin/admin')
    async removeAdmin(@Param('id') id: number, @Param('admin') admin: string) {
        console.log('Remove admin')
        return this.chatService.removeMember(id, String(admin), "admin");
    }

    @ApiOperation({ summary: 'Ban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user banned' }) //answer sent back
    @ApiConflictResponse({ description: 'user already banned' }) //not working atm
    @Post(':id/ban/:user')
    async addBanned(@Param('id') id: number, @Param('user') user: string) {
        console.log('Adding banned')
        return this.chatService.addMember(id, String(user), "ban");
    }

    @ApiOperation({ summary: 'Unban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user unbanned' }) //answer sent back
    @ApiConflictResponse({ description: 'user already unbanned' }) //not working atm
    @Post(':id/unban/:user')
    async removeBanned(@Param('id') id: number, @Param('user') user: string) {
        console.log('Remove banned')
        return this.chatService.removeMember(id, String(user), "ban");
    }

    @ApiOperation({ summary: 'TempBan user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user temp banned' }) //answer sent back
    @ApiConflictResponse({ description: 'user already temp banned' }) //not working atm
    @Post(':id/tempban/:user')
    async addTempBan(@Param('id') id: number, @Param('user') user: string) {
        console.log('Adding banned')
        return this.chatService.addMember(id, String(user), "temp_ban");
    }

    @ApiOperation({ summary: 'Untempban user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'user untempbanned' }) //answer sent back
    @ApiConflictResponse({ description: 'user already untempbanned' }) //not working atm
    @Post(':id/tempunban/:user')
    async removeTempBan(@Param('id') id: number, @Param('user') user: string) {
        console.log('Remove temp ban')
        return this.chatService.removeMember(id, String(user), "temp_ban");
    }

}
