import { Request, Req, Body, Controller, Delete, Put, Get, Param, Patch, Post, UseGuards, UseInterceptors, UploadedFile, Header } from '@nestjs/common';
import { UserService, fileMimetypeFilter } from './user.service';
import CreateUserDtoViaRegistration, { UpdateUserDto, UploadAvatarDto } from 'src/user/dto/user.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImageFile } from 'src/user/utils/api-file.decorator';
import { ParseFile } from 'src/user/utils/parse-file.pipe';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { Observable } from 'rxjs';
import { RelationStatusClass, } from 'src/user/interface/friend-request.interface';
import { User } from 'src/user/entity/user.entity';

@ApiTags('Users')
@ApiExtraModels(CreateUserDtoViaRegistration) //force unused dto to show on swagger
@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'Retrieve all users data' })
    @ApiOkResponse({ description: 'Data received' })
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Retrieve {login}\'s data' })
    @ApiOkResponse({ description: 'Data received' })
    @ApiConflictResponse({ description: '{login} does\'t exist' })
    @Get(':login')
    getUserByLogin(@Param('login') login: string) {
        console.log('Get user ' + login + ' data')
        return this.userService.getUserByLogin(String(login));
    }

    @ApiOperation({ summary: 'Update {login}\'s data' })
    @ApiOkResponse({ description: 'Data updated' })
    @Patch(':login')
    async updateUser(@Param('login') login: string, @Body() user: UpdateUserDto) {
        console.log('Update user ' + login)
        return this.userService.updateUser(String(login), user);
    }

    @ApiOperation({ summary: 'Delete {login} profile' })
    @ApiOkResponse({ description: '{login} deleted' })
    @Delete(':login')
    async deleteUser(@Param('login') login: string) {
        console.log('Delete user ' + login)
        return this.userService.deleteUser(String(login));
    }

    @ApiOperation({ summary: 'Upload {login} avatar' })
    @ApiOkResponse({ description: '{login} avatar uploaded' })
    @ApiConflictResponse({ description: '{login} avatar conflict' })
    @Post(':login/avatar')
    @UseInterceptors(FileInterceptor('file')) // 👈 field name must match
    @ApiConsumes('multipart/form-data')
    @ApiImageFile('avatar', true)
    uploadFile(@Param('login') login: string, @UploadedFile(ParseFile) file: Express.Multer.File) {
        console.log(login, file);
        return this.userService.addAvatar(String(login), String(file.filename));
    }

    @ApiOperation({ summary: 'Update {status} of {login}' })
    @ApiOkResponse({ description: '{status} added' })
    @ApiConflictResponse({ description: '{status} conflict with {login}' })
    @Post(':login/status/:status')
    async updateStatus(@Param('login') login: string, @Param('status') status: string) {
        console.log('Update status')
        return this.userService.updateStatus(String(login), String(status));
    }

    @ApiOperation({ summary: 'Send invite to the targeted user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/sendInvitation/:receiverId')
    sendInvitation(@Param('receiverId') receiverId: number, @Request() req) {
        return this.userService.sendInvitation(receiverId, req.user);
    }

    @ApiOperation({ summary: 'Answer to the invitation request (accepted/declined/blocked) [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/answerToInvitation/:invitationId')
    answerToInvitation(@Param('invitationId') invitationId: number, @Body() statusResponse: RelationStatusClass) {
        return this.userService.answerToInvitation(statusResponse.status, invitationId);
    }

    @ApiOperation({ summary: 'List all received invitation [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/receivedInvitations')
    getReceivedInvitations(@Request() req): Observable<RelationStatusClass[]> {
        return this.userService.getReceivedInvitations(req.user);
    }

    @ApiOperation({ summary: 'Returns list of your friends [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/allFriends')
    getFriends(@Request() req): Promise<User[]> {
        return this.userService.getFriends(req.user);
    }

    @ApiOperation({ summary: 'Remove someone as friend [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/remove/:receiverId')
    removeFriend(@Param('receiverId') receiverId: number, @Request() req) {
        return this.userService.removeFriend(receiverId, req.user);
    }

    @ApiOperation({ summary: 'Block a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/block/:receiverId')
    blockUser(@Param('receiverId') receiverId: number, @Request() req) {
        return this.userService.blockUser(receiverId, req.user);
    }

    @ApiOperation({ summary: 'Unblock a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/unblock/:receiverId')
    unblockUser(@Param('receiverId') receiverId: number, @Request() req) {
        return this.userService.unblockUser(receiverId, req.user);
    }

    @ApiOperation({ summary: 'Returns list of blocked users [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/allBlocked')
    getBlockedUsers(@Request() req): Promise<User[]> {
        return this.userService.getBlockedUsers(req.user);
    }
}
