import { Req, Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService, fileMimetypeFilter } from './user.service';
import CreateUserDtoViaRegistration, { CreateUserDto, UpdateUserDto, UploadAvatarDto } from './user.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImageFile } from './api-file.decorator';
import { ParseFile } from './parse-file.pipe';

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
    **  Save a new user to db
    **/

    @ApiOperation({ summary: 'Create a new user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'User creation suceed' }) //answer sent back
    @ApiConflictResponse({ description: 'User already exist' }) //not working atm
    @Post()
    async createUser(@Body() user: CreateUserDto) {
        console.log('Create user ' + user.login)
        return this.usersService.createUser(user);
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

    /**
    **  Adding friend user
    **/

    @ApiOperation({ summary: 'Adding new {friend}' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{friend} added' }) //answer sent back
    @ApiConflictResponse({ description: '{friend} already {login} friend' }) //not working atm
    @Post(':login/add/:friend')
    async addFriend(@Param('login') login: string, @Param('friend') friend: string) {
        console.log('Adding friend')
        return this.usersService.addFriend(String(login), String(friend));
    }

    /**
    **  Remove friend user
    **/

    @ApiOperation({ summary: 'Remove new {friend}' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{friend} deleted' }) //answer sent back
    @ApiConflictResponse({ description: '{friend} not {login} friend' }) //not working atm
    @Delete(':login/remove/:friend')
    async removeFriend(@Param('login') login: string, @Param('friend') friend: string) {
        console.log('Remove friend')
        return this.usersService.removeFriend(String(login), String(friend));
    }

    /**
    **  Toggle Two Factor Authentication
    **/

    // @ApiOperation({ summary: 'Toggle {login} Two Factor Authentication' }) //endpoint summary on swaggerui
    // @ApiOkResponse({ description: 'Two Factor Authentication Toggled' }) //answer sent back
    // @ApiConflictResponse({ description: 'Can\'t toggle Two Factor Authentication' }) //not working atm
    // @Get(':login/2fa')
    // async toggleTwoFactorAuthentication(@Param('login') login: string) {
    //     console.log('Toggle ' + login + ' Two Factor Authentication')
    //     return this.usersService.toggleTwoFactorAuthentication(String(login));
    // }

    /**
    **  Turn On Two Factor Authentication
    **/

    @ApiOperation({ summary: 'Turn On {login} Two Factor Authentication' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Two Factor Authentication {login} turned On' }) //answer sent back
    @ApiConflictResponse({ description: 'Can\'t turn On Two Factor Authentication' }) //not working atm
    @Get(':login/2fa/on')
    async toggleTwoFactorAuthentication(@Param('login') login: string) {
        console.log('Turn On ' + login + ' Two Factor Authentication')
        return this.usersService.turnOnTwoFactorAuthentication(String(login));
    }

    /**
    **  Turn Off Two Factor Authentication
    **/

    @ApiOperation({ summary: 'Turn Off {login} Two Factor Authentication' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Two Factor Authentication {login} turned Off' }) //answer sent back
    @ApiConflictResponse({ description: 'Can\'t turn Off Two Factor Authentication' }) //not working atm
    @Get(':login/2fa/off')
    async turnOffTwoFactorAuthentication(@Param('login') login: string) {
        console.log('Turn Off ' + login + ' Two Factor Authentication')
        return this.usersService.turnOnTwoFactorAuthentication(String(login));
    }

    /**
    **  Setup Two Factor Authentication
    **/

    @ApiOperation({ summary: 'Setup {login} Two Factor Authentication' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Two Factor Authentication set' }) //answer sent back
    @ApiConflictResponse({ description: 'Can\'t setup Two Factor Authentication' }) //not working atm
    @Post(':login/2fa/:secret')
    async setupTwoFactorAuthentication(@Param('login') login: string, @Param('login') secret: string) {
        console.log('Setup ' + login + ' Two Factor Authentication')
        return this.usersService.setupTwoFactorAuthentication(String(login), String(secret));
    }
}
