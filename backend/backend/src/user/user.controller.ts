import { Request, Req, Body, Controller, Delete, Put, Get, Param, Patch, Post, UseGuards, UseInterceptors, UploadedFile, Header, Res } from '@nestjs/common';
import { UserService, fileMimetypeFilter } from './user.service';
import CreateUserDtoViaRegistration, { UpdateUserDto, UploadAvatarDto } from 'src/user/dto/user.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImageFile } from 'src/user/utils/api-file.decorator';
import { ParseFile } from 'src/user/utils/parse-file.pipe';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FtOauthGuard } from 'src/auth/42auth/guard/ft-oauth.guard';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { Observable } from 'rxjs';
import { RelationStatusClass, } from 'src/user/interface/friend-request.interface';
import { User } from 'src/user/entity/user.entity';
import { editFileName, imageFileFilter, myStorage } from './upload.utils'
import { Achievement } from './entity/achievement.entity';

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

    @ApiOperation({ summary: 'Retrieve all users data' })
    @ApiOkResponse({ description: 'Data received' })
    @Get('cookie/test')
    //@UseGuards(JwtAuthenticationGuard)
    getCookie(@Req() request) {
        console.log(request.cookies);
        return request.cookies;
        //return (response.cookies);
    }

    @ApiOperation({ summary: 'Retrieve {login}\'s data' })
    @ApiOkResponse({ description: 'Data received' })
    @ApiConflictResponse({ description: '{login} does\'t exist' })
    @Get(':login')
    getUserByLogin(@Param('login') login: string) {
        console.log('Get user ' + login + ' data :v')
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

    /**
    **  Upload user avatar
    **/

    @ApiOperation({ summary: 'Upload {login} avatar' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{login} avatar uploaded' }) //answer sent back
    @ApiConflictResponse({ description: '{login} avatar conflict' }) //not working atm
    @Post('avatar/:login')
    @ApiImageFile('file', true)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './upload',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@Param('login') login: string, @UploadedFile() file) {
        const response = {
            login: login,
            originalname: file.originalname,
            filename: file.filename,
        };
        console.log(response);
        return this.userService.addAvatar(login, file.filename);
    }
    // uploadAvatar(@Param('login') login: string, @UploadedFile() file: Express.Multer.File) {
    //     console.log("login: " + login + ", upload: " + file.filename);
    //     return this.userService.addAvatar(login, file.filename);
    // }

    @ApiOperation({ summary: 'Get {fileId} avatar' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{fileId} avatar displayed' }) //answer sent back
    @ApiConflictResponse({ description: '{fileId} avatar conflict' }) //not working atm
    @Get(':fileId/avatar')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'upload' });
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
    @Post('relation/sendInvitation/:receiverLogin')
    sendInvitation(@Param('receiverLogin') receiverLogin: string, @Request() req) {
        return this.userService.sendInvitation(receiverLogin, req.user);
    }

    /*
    @ApiOperation({ summary: 'Answer to the invitation request (accepted/declined/blocked) [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/answerToInvitation/:invitationId')
    answerToInvitation(@Param('invitationId') invitationId: number, @Body() statusResponse: RelationStatusClass, @Request() req) {
        return this.userService.answerToInvitation(statusResponse.status, invitationId, req.user);
    }
*/
    @ApiOperation({ summary: 'Answer to the invitation request (accepted/declined/blocked) [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/answerToInvitation/:login')
    answerToInvitation(@Param('login') login: string, @Body() statusResponse: RelationStatusClass, @Request() req) {
        return this.userService.answerToInvitation(statusResponse.status, login, req.user);
    }

    @ApiOperation({ summary: 'List all received invitation [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/receivedInvitations')
    getReceivedInvitations(@Request() req): Observable<RelationStatusClass[]> {
        return this.userService.getReceivedInvitations(req.user);
    }

    @ApiOperation({ summary: 'List all received invitation [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/pendingInvitations')
    getPendingInvitations(@Request() req): Observable<RelationStatusClass[]> {
        return this.userService.getPendingInvitations(req.user);
    }

    @ApiOperation({ summary: 'Returns list of your friends [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/allFriends')
    getFriends(@Request() req): Promise<User[]> {
        return this.userService.getFriends(req.user);
    }

    /*
    @ApiOperation({ summary: 'Remove someone as friend [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/remove/:receiverId')
    removeFriend(@Param('receiverId') receiverId: number, @Request() req) {
        return this.userService.removeFriend(receiverId, req.user);
    }
*/

    @ApiOperation({ summary: 'Remove someone as friend [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/remove/:login')
    removeFriend(@Param('login') login: string, @Request() req) {
        return this.userService.removeFriend(login, req.user);
    }

    @ApiOperation({ summary: 'Block a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/block/:login')
    blockUser(@Param('login') login: string, @Request() req) {
        return this.userService.blockUser(login, req.user);
    }

    @ApiOperation({ summary: 'Unblock a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/unblock/:login')
    unblockUser(@Param('login') login: string, @Request() req) {
        return this.userService.unblockUser(login, req.user);
    }

    @ApiOperation({ summary: 'Returns list of blocked users [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/allBlocked')
    getBlockedUsers(@Request() req): Promise<User[]> {
        return this.userService.getBlockedUsers(req.user);
    }

    /*
    @ApiOperation({ summary: 'Returns list of achievements [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('achievements/me')
    getAchievements(@Request() req) {
        console.log("test back controller get achievements");
        return this.userService.getAchievements(req.user);
    }
    */

    @ApiOperation({ summary: 'Returns list of achievements of a specific user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('achievements/:login')
    getAchievementsOf(@Param('login') login: string)/*: Observable<Achievement[]>*/ {
        //console.log("test back controller get achievements");
        console.log('get specific achievement of user' + login);
        return this.userService.getAchievementsOf(login);
    }
}
