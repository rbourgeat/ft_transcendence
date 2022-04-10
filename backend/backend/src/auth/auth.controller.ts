import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, Redirect } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';

import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from 'src/auth/guard/localauth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import RegisterDto from 'src/auth/dto/register.dto';
import LogInDto from 'src/auth/dto/logIn.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/user/user.repository';

@ApiTags('Auth')
@ApiExtraModels(LogInDto) //force the dto to appear on Swagger
@Controller('api/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthService,
        private readonly userService: UserService,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) { }

    @ApiOperation({ summary: 'register new user' })
    @ApiOkResponse({ description: 'Your registration suceed' })
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        console.log('went by register in auth controller');
        return this.authenticationService.register(registrationData);
    }

    @ApiOperation({ summary: 'log in user' })
    @ApiOkResponse({ description: 'You logged in' })
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Body() loginDto: LogInDto, @Req() request: RequestWithUser) { //loginDto not used but mandatory to let know that params needs to be sent
        const { user } = request;
        const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(user.id);

        this.userService.updateStatus(user.login, "online");

        request.res.setHeader('Set-Cookie', accessTokenCookie);
        console.log('end of login');
        if (user.isTwoFactorAuthenticationEnabled)
            return user;
        return user;
    }

    @ApiOperation({ summary: 'log out user [jwt-protected]' })
    @ApiOkResponse({ description: 'You logged out' })
    @UseGuards(JwtAuthenticationGuard)
<<<<<<< HEAD
    //@Redirect('http://localhost:3030/')
=======
>>>>>>> bc8c4adcb3578401f6c0e8042bcadd5940e0a8d3
    @Post('log-out')
    async logOut(@Res({ passthrough: true }) response: Response, @Req() request: RequestWithUser) {

        const { user } = request;
        this.userService.updateStatus(user.login, "offline");
        console.log('went by logout in auth controller');
<<<<<<< HEAD
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        //response.clearCookie('jwt');
        //response.redirect('http://localhost:3030/');
        return user;
=======
        //this.authenticationService.getCookieForLogOut();
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        //return response.sendStatus(200);
        // response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        response.clearCookie('jwt');
        response.redirect('http://localhost:3030/');
        // return response.sendStatus(200);
>>>>>>> bc8c4adcb3578401f6c0e8042bcadd5940e0a8d3
    }

    @ApiOperation({ summary: 'Check user session with cookie [jwt-protected]' })
    @ApiOkResponse({ description: 'Valid session returning user data' })
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        return user;
    }
}
