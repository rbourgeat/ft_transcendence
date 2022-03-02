import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth42Guard } from './42auth.guard';
import { Auth42Service } from './42auth.service';

@ApiTags('42auth')
@Controller('api/42auth')
export class Auth42Controller {
    constructor(
        private readonly auth42Service: Auth42Service
    ) { }

    @ApiOperation({ summary: 'login with 42 API' })
    @UseGuards(Auth42Guard)
    @Get('login')
    async login() { }
}
