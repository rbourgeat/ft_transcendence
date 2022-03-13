import { Controller, Get, Redirect, UseGuards, Header } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FtOauthGuard } from './guard/ft-oauth.guard';

@ApiTags('Auth')
//@Controller('api/login')
@Controller('api/42auth')
//@Header('Access-Control-Allow-Origin', '*')
export class Auth42Controller {
    //@Get('42')
    @Get('login')
    @UseGuards(FtOauthGuard)
    ftAuth() {
        console.log('ftauth in controller');
        return;
    }

    //@Get('api/42/return')
    @Get('redirect')
    @UseGuards(FtOauthGuard)
    //@Redirect('/')
    //@Redirect({ statusCode: HttpStatus.TEMPORARY_REDIRECT, url: 'https://nestjs.com' })
    @Redirect('http://localhost:3030/chat')
    ftAuthCallback() {
        console.log('ftauthcallback in controller');
        return;
    }
}
