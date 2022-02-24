import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UploadAvatarDto } from './user.dto';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users') //Create a category on swagger
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
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post(':login/upload')
    @UseInterceptors(FileInterceptor('avatar'))
    uploadFile(@Body() body: UploadAvatarDto, @UploadedFile() file: Express.Multer.File) {
        // console.log(file);
        return { file: file.buffer.toString() };
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
        return this.usersService.addFriend(login, friend);
    }

    /**
    **  Remove friend user
    **/

    @ApiOperation({ summary: 'Adding new {friend}' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: '{friend} added' }) //answer sent back
    @ApiConflictResponse({ description: '{friend} already {login} friend' }) //not working atm
    @Delete(':login/remove/:friend')
    async removeFriend(@Param('login') login: string, @Param('friend') friend: string) {
        console.log('Remove friend')
        return this.usersService.removeFriend(login, friend);
    }
}
