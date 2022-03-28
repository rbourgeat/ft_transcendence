import { Controller, Get, Redirect, UseGuards, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FtOauthGuard } from './guard/ft-oauth.guard';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('api/42auth')
export class Auth42Controller {
    constructor(
        private readonly authenticationService: AuthService,
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: '[do not use in swagger, won\'t work]' })
    @Get('login')
    @UseGuards(FtOauthGuard)
    ftAuth() {
        return;
    }

    @ApiOperation({ summary: '[do not use in swagger, won\'t work]' })
    @Get('redirect')
    @UseGuards(FtOauthGuard)
    @Redirect('http://localhost:3030/user')
    async ftAuthCallback(@Req() req) {
        console.log(req.user);
        const test = req.user;

        console.log('id:' + test.id);
        console.log('login:' + test.username);

        const currentUser = await this.userService.getUserByLogin(test.username);

        const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(currentUser.id);
        req.res.setHeader('Set-Cookie', accessTokenCookie);
        //console.log("coucou on est passe par la");
        return;
    }
}
