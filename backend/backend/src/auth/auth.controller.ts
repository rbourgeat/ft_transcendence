import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localauth.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import LogInDto from './logIn.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth') //Create a category on swagger
@ApiExtraModels(LogInDto) //force unused dto to show on swagger
@Controller('api/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthService,
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'register new user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Your registration suceed' }) //answer sent back
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        console.log('went by register in auth controller');
        return this.authenticationService.register(registrationData);
    }

    @ApiOperation({ summary: 'log in user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'You logged in' }) //answer sent back
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Body() loginDto: LogInDto, @Req() request: RequestWithUser, @Res() response: Response) {
        console.log('went by login in auth controller');
        const { user } = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        // user.status = "Online";
        this.userService.updateStatus(user.login, "Online");
        console.log('END OF LOGIN');
        return response.send(user);
    }

    @ApiOperation({ summary: 'log out user' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'You logged out' }) //answer sent back
    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Res() response: Response) {
        console.log('went by logout in auth controller');
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        console.log('END OF LOGOUT');
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @ApiOperation({ summary: 'Check user session via cookie' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Valid session returning user data' }) //answer sent back
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        console.log('went by authenticate in auth controller');
        const user = request.user;
        user.password = undefined;
        this.userService.updateStatus(user.login, "Online");
        return user;
    }
}