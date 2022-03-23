import { Request, Req, Body, Controller, Delete, Put, Get, Param, Patch, Post, UseGuards, UseInterceptors, UploadedFile, Header } from '@nestjs/common';
import { UserService, fileMimetypeFilter } from './user.service';
import CreateUserDtoViaRegistration, { UpdateUserDto, UploadAvatarDto } from 'src/user/dto/user.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImageFile } from 'src/user/utils/api-file.decorator';
import { ParseFile } from 'src/user/utils/parse-file.pipe';

import { FtOauthGuard } from 'src/auth/42auth/guard/ft-oauth.guard';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
    FriendRequest,
    FriendRequestStatus,
} from 'src/user/interface/friend-request.interface';
import { User } from 'src/user/entity/user.entity';

@ApiTags('Users') //Create a category on swagger
@ApiExtraModels(CreateUserDtoViaRegistration) //force unused dto to show on swagger
@Controller('api/user')
export class UserController {
    constructor(
        private readonly usersService: UserService
    ) { }

    @ApiOperation({ summary: 'Retrieve all users data' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Data received' }) //answer sent back
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    /**
    **  Retrieve user data by login
    **/

    @ApiOperation({ summary: 'Retrieve {login}\'s data' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Data received' }) //answer sent back
    @ApiConflictResponse({ description: '{login} does\'t exist' }) //not working atm
    @Get(':login')
    getUserByLogin(@Param('login') login: string) {
        console.log('Get user ' + login + ' data')
        return this.usersService.getUserByLogin(String(login));
    }

    /**
    **  Update user data to db
    **/

    @ApiOperation({ summary: 'Update {login}\'s data' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Data updated' }) //answer sent back
    @Patch(':login')
    async updateUser(@Param('login') login: string, @Body() user: UpdateUserDto) {
        console.log('Update user ' + login)
        return this.usersService.updateUser(String(login), user);
    }

    /**
    **  Delete user data to db
    **/

    @ApiOperation({ summary: 'Delete {login} profile' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{login} deleted' }) //answer sent back
    @Delete(':login')
    async deleteUser(@Param('login') login: string) {
        console.log('Delete user ' + login)
        return this.usersService.deleteUser(String(login));
    }

    /**
    **  Upload user avatar
    **/

    @ApiOperation({ summary: 'Upload {login} avatar' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{login} avatar uploaded' }) //answer sent back
    @ApiConflictResponse({ description: '{login} avatar conflict' }) //not working atm
    @Post(':login/avatar')
    @UseInterceptors(FileInterceptor('file')) // 👈 field name must match
    @ApiConsumes('multipart/form-data')
    @ApiImageFile('avatar', true)
    uploadFile(@Param('login') login: string, @UploadedFile(ParseFile) file: Express.Multer.File) {
        console.log(login, file);
        return this.usersService.addAvatar(String(login), String(file.filename));
    }

    /**
    **  Update user status
    **/

    @ApiOperation({ summary: 'Update {status} of {login}' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{status} added' }) //answer sent back
    @ApiConflictResponse({ description: '{status} conflict with {login}' }) //not working atm
    @Post(':login/status/:status')
    async updateStatus(@Param('login') login: string, @Param('status') status: string) {
        console.log('Update status')
        return this.usersService.updateStatus(String(login), String(status));
    }
    /*

        @ApiOperation({ summary: 'Adding new {friend}' }) //endpoint summary on swaggerui
        @ApiOkResponse({ description: '{friend} added' }) //answer sent back
        @ApiConflictResponse({ description: '{friend} already {login} friend' }) //not working atm
        @Post(':login/add/:friend')
        async addFriend(@Param('login') login: string, @Param('friend') friend: string) {
            console.log('Adding friend')
            return this.usersService.addFriend(String(login), String(friend));
        }

        @ApiOperation({ summary: 'Remove new {friend}' }) //endpoint summary on swaggerui
        @ApiOkResponse({ description: '{friend} deleted' }) //answer sent back
        @ApiConflictResponse({ description: '{friend} not {login} friend' }) //not working atm
        @Delete(':login/remove/:friend')
        async removeFriend(@Param('login') login: string, @Param('friend') friend: string) {
            console.log('Remove friend')
            return this.usersService.removeFriend(String(login), String(friend));
        }
    */

    /////////////////
    @ApiOperation({ summary: 'Send invite to the targeted user' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('friend-request/send/:receiverId')
    sendFriendRequest(@Param('receiverId') receiverStringId: string, @Request() req) {
        const receiverId = parseInt(receiverStringId);
        console.log(receiverId);
        return this.usersService.sendFriendRequest(receiverId, req.user);
    }

    //not ok
    /*
    @ApiOperation({ summary: 'Check the invitation status of targeted user' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('friend-request/status/:receiverId')
    getFriendRequestStatus(@Param('receiverId') receiverStringId: string, @Request() req)
        : Observable<FriendRequestStatus> {
        const receiverId = parseInt(receiverStringId);
        return this.usersService.getFriendRequestStatus(receiverId, req.user);
    }
*/

    @ApiOperation({ summary: 'Answer to the invitation request (accepted/declined)' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('friend-request/response/:friendRequestId')
    respondToFriendRequest(@Param('friendRequestId') friendRequestStringId: string, @Body() statusResponse: FriendRequestStatus)
        /*: Observable<FriendRequestStatus>*/ {
        const friendRequestId = parseInt(friendRequestStringId);
        return this.usersService.respondToFriendRequest(statusResponse.status, friendRequestId);
    }

    @ApiOperation({ summary: 'List all received invitation' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('friend-request/me/received-requests')
    getFriendRequestsFromRecipients(
        @Request() req,
    ): Observable<FriendRequestStatus[]> {
        return this.usersService.getFriendRequestsFromRecipients(req.user);
    }

    @ApiOperation({ summary: 'Returns list of your friends' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('friends/my')
    getFriends(@Request() req): Promise<User[]> {
        return this.usersService.getFriends(req.user);
    }

    @ApiOperation({ summary: 'Remove someone as friend' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('friends/remove/:receiverId')
    removeFriends(@Param('receiverId') receiverStringId: string, @Request() req) {
        const receiverId = parseInt(receiverStringId);
        console.log(receiverId);
        return this.usersService.removeFriend(receiverId, req.user);
    }
}
