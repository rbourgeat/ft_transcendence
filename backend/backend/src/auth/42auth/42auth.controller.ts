import { Controller, Get, Redirect, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FtOauthGuard } from './guard/ft-oauth.guard';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Auth')
@Controller('api/42auth')
export class Auth42Controller {
    constructor(
        private readonly authenticationService: AuthService,
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
    ftAuthCallback(@Req() request: RequestWithUser) {
        const { user } = request;
        const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(user.id);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        console.log('end of login');
        //console.log("coucou on est passe par la");
        return;
    }
}
