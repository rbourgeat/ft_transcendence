import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FtOauthGuard } from './guard/ft-oauth.guard';

@ApiTags('Auth')
@Controller('api/42auth')
export class Auth42Controller {
    @ApiOperation({ summary: '[do not use in swagger, won\'t work]' })
    @Get('login')
    @UseGuards(FtOauthGuard)
    ftAuth() {
        return;
    }

    @ApiOperation({ summary: '[do not use in swagger, won\'t work]' })
    @Get('redirect')
    @UseGuards(FtOauthGuard)
    @Redirect('http://localhost:3030/chat')
    ftAuthCallback() {
        console.log("coucou on est passe par la");
        return;
    }
}
