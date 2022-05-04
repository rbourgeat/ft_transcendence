import { Controller, Get, Redirect, UseGuards, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/user/user.repository';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FtOauthGuard } from './guard/ft-oauth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('api/42auth')
export class Auth42Controller {
    constructor(
        private readonly authenticationService: AuthService,
        private readonly userService: UserService,
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
    @Redirect('http://'.concat(process.env.TEST).concat(':3030/settings'))
    async ftAuthCallback(@Req() req) {
        const test = req.user;
        const currentUser = await this.userService.getUserByLogin42(test.username);
        await this.userService.updateStatus(currentUser.login, "online");

        const accessTokenCookie = await this.authenticationService.getCookieWithJwtToken(currentUser.id);
        req.res.setHeader('Set-Cookie', accessTokenCookie);
        return;
    }

    @ApiOperation({ summary: '[To be redirected]' })
    @Get('redirect-user')
    //@UseGuards(FtOauthGuard)
    @Redirect('http://'.concat(process.env.TEST).concat(':3030/settings'))
    async ftRedirectUser() {
    }
}
