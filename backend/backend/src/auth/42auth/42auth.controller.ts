import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FtOauthGuard } from './guard/ft-oauth.guard';

@ApiTags('Auth')
@Controller('api/42auth')
export class Auth42Controller {
    @Get('login')
    @UseGuards(FtOauthGuard)
    ftAuth() {
        return;
    }

    @Get('redirect')
    @UseGuards(FtOauthGuard)
    @Redirect('http://localhost:3030/chat')
    ftAuthCallback() {
        return;
    }
}
