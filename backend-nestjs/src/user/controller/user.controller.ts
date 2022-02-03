import { Controller, Post, Get } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('user')
export class UserController {
	constructor(private UserService: UserService) {}

	@Post()
	create(@Body() user: UserDto): Promise<UserDto> {
		return this.UserService.create(user);
	}

	@Get()
	async findAll(): Promise<UserDto[]> {
		return this.UserService.findAll();
	}
}
