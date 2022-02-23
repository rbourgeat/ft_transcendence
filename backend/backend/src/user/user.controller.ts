import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly usersService: UserService
    ) { }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    /*
    @Get(':id')
    getUserById(@Param('id') id: number) {
        console.log('Get user #' + id)
        return this.usersService.getUserById(Number(id));
    }
    */

    @Get(':login')
    getUserByLogin(@Param('login') login: string) {
        console.log('Get user ' + login + ' data')
        return this.usersService.getUserByLogin(String(login));
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        console.log('Create user #' + user.id + '(' + user.login + ')')
        return this.usersService.createUser(user);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        console.log('Update user #' + id + '(' + user.login + ')')
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        console.log('Delete user #' + id)
        return this.usersService.deleteUser(Number(id));
    }
}
