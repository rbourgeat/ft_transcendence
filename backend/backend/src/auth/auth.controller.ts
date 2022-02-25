import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localauth.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'

@ApiTags('Auth') //Create a category on swagger
@Controller('api/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthService
    ) { }

    @ApiOperation({ summary: 'register new user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Your registration suceed' }) //answer sent back
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @ApiOperation({ summary: 'log in user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'You logged in' }) //answer sent back
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
        console.log('test');
        const { user } = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @ApiOperation({ summary: 'log out user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'You logged out' }) //answer sent back
    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}