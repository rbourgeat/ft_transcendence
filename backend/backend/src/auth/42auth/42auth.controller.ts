import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { FtOauthGuard } from './guard/ft-oauth.guard';

@Controller('login')
export class Auth42Controller {
    @Get('42')
    @UseGuards(FtOauthGuard)
    ftAuth() {
        console.log('ftauth in controller');
        return;
    }

    @Get('42/return')
    @UseGuards(FtOauthGuard)
    @Redirect('/')
    ftAuthCallback() {
        console.log('ftauthcallback in controller');
        return;
    }
}