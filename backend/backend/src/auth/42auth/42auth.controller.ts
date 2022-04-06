import { Controller, Get, Redirect, UseGuards, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/user/user.repository';
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
        private readonly userService: UserService,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
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
        console.log('test in redirect 42auth');
        const test = req.user;
        const currentUser = await this.userService.getUserByLogin(test.username);

        console.log(currentUser.id);

        await this.userService.updateStatus(currentUser.login, "online");

        const accessTokenCookie = await this.authenticationService.getCookieWithJwtToken(currentUser.id);
        req.res.setHeader('Set-Cookie', accessTokenCookie);
        return;
    }
}
