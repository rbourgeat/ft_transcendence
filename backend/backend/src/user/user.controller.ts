import { Request, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDtoViaRegistration from 'src/user/dto/user.dto';
import { ApiExtraModels, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImageFile } from 'src/user/utils/api-file.decorator';
import { diskStorage } from 'multer';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { Observable } from 'rxjs';
import { RelationStatusClass, } from 'src/user/interface/friend-request.interface';
import { User } from 'src/user/entity/user.entity';
import { editFileName, imageFileFilter } from './upload.utils'

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
        return this.userService.getUserByLogin(login);
    }

    @ApiOperation({ summary: 'Update {login}\'s data' })
    @ApiOkResponse({ description: 'Data updated' })
    @Patch(':oldlogin/changeto/:newlogin')
    async updateUser(@Param('oldlogin') oldlogin: string, @Param('newlogin') newlogin: string) {
        console.log("test, oldlogin: " + oldlogin + ", newlogin: " + newlogin);
        return this.userService.updateUser(oldlogin, newlogin);
    }

    @ApiOperation({ summary: 'Upload {login} avatar' })
    @ApiOkResponse({ description: '{login} avatar uploaded' })
    @ApiConflictResponse({ description: '{login} avatar conflict' })
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
        return this.userService.addAvatar(login, file.filename);
    }

    @ApiOperation({ summary: 'Get {fileId} avatar' })
    @ApiOkResponse({ description: '{fileId} avatar displayed' })
    @ApiConflictResponse({ description: '{fileId} avatar conflict' })
    @Get(':fileId/avatar')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'upload' });
    }

    @ApiOperation({ summary: 'Update {status} of {login}' })
    @ApiOkResponse({ description: '{status} added' })
    @ApiConflictResponse({ description: '{status} conflict with {login}' })
    @Post(':login/status/:status')
    async updateStatus(@Param('login') login: string, @Param('status') status: string) {
        return this.userService.updateStatus(String(login), String(status));
    }

    @ApiOperation({ summary: 'Send invite to the targeted user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/sendInvitation/:receiverLogin')
    sendInvitation(@Param('receiverLogin') receiverLogin: string, @Request() req) {
        return this.userService.sendInvitation(receiverLogin, req.user);
    }

    @ApiOperation({ summary: 'Answer to the invitation request (accepted/declined/blocked) [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/answerToInvitation/:login')
    async answerToInvitation(@Param('login') login: string, @Body() statusResponse: RelationStatusClass, @Request() req) {
        const creator = await this.getUserByLogin(login);
        return this.userService.updateRelationStatus(statusResponse.status, creator, req.user);
    }

    @ApiOperation({ summary: 'List all received invitations [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/receivedInvitations')
    getReceivedInvitations(@Request() req): Observable<RelationStatusClass[]> {
        return this.userService.getReceivedInvitations(req.user);
    }

    @ApiOperation({ summary: 'List all sent invitations [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/sentInvitations')
    getSentInvitations(@Request() req): Observable<RelationStatusClass[]> {
        return this.userService.getSentInvitations(req.user);
    }

    @ApiOperation({ summary: 'List all pending invitations [jwt-protected]' })
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

    @ApiOperation({ summary: 'Remove someone as a friend [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/remove/:login')
    async removeFriend(@Param('login') login: string, @Request() req) {
        const target = await this.getUserByLogin(login);
        if (target)
            return this.userService.removeRelation(target, req.user);
    }

    @ApiOperation({ summary: 'Block a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('relation/block/:login')
    async blockUser(@Param('login') login: string, @Request() req) {
        const target = await this.getUserByLogin(login);
        if (target)
            return this.userService.blockUser(target, req.user);
    }

    @ApiOperation({ summary: 'Get current relation status with a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/relationStatusWith/:login')
    async getRelation(@Param('login') login: string, @Request() req): Promise<any> {
        const target = await this.getUserByLogin(login);
        if (target)
            return this.userService.getRelation(target, req.user);
    }

    @ApiOperation({ summary: 'Unblock a user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Delete('relation/unblock/:login')
    async unblockUser(@Param('login') login: string, @Request() req) {
        const target = await this.getUserByLogin(login);
        if (target)
            return this.userService.unblockUser(target, req.user);
    }

    @ApiOperation({ summary: 'Returns list of blocked users [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('relation/me/allBlocked')
    getBlockedUsers(@Request() req): Promise<User[]> {
        return this.userService.getBlockedUsers(req.user);
    }

    @ApiOperation({ summary: 'Returns achievements list of a specific user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('achievements/:login')
    async getAchievements(@Param('login') login: string) {
        const target = await this.getUserByLogin(login);
        if (target)
            return this.userService.getAchievements(target);
    }

    @ApiOperation({ summary: 'Return stats list of a specific user [jwt-protected]' })
    @UseGuards(JwtAuthenticationGuard)
    @Get('stats/:login')
    async getStats(@Param('login') login: string) {
        return this.userService.getStats(login);
    }
}
