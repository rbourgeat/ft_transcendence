import { Controller, Get, Redirect, UseGuards, Header } from '@nestjs/common';
import { FtOauthGuard } from './guard/ft-oauth.guard';

@Controller('api/login')
//@Header('Access-Control-Allow-Origin', '*')
export class Auth42Controller {
    @Get('42')
    @UseGuards(FtOauthGuard)
    ftAuth() {
        console.log('ftauth in controller');
        return;
    }

    @Get('api/42/return')
    @UseGuards(FtOauthGuard)
    @Redirect('/')
    ftAuthCallback() {
        console.log('ftauthcallback in controller');
        return;
    }
}
