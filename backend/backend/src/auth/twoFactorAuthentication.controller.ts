import {
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
    UseGuards,
    Res,
    Req,
    Body,
    UnauthorizedException, HttpCode,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { UserService } from '../user/user.service';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service';

@ApiTags('2fa')
@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
        private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
        private readonly userService: UserService,
        private readonly authenticationService: AuthService
    ) { }

    @Post('authenticate')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async authenticate(
        @Req() request: RequestWithUser,
        @Body() { twoFactorAuthenticationCode }//: TwoFactorAuthenticationCodeDto
    ) {
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
            twoFactorAuthenticationCode, request.user
        );
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }

        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);

        request.res.setHeader('Set-Cookie', [accessTokenCookie]);

        return request.user;
    }

    @Post('turn-on')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async turnOnTwoFactorAuthentication(
        @Req() request: RequestWithUser,
        @Body() { twoFactorAuthenticationCode }//: TwoFactorAuthenticationCodeDto
    ) {
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
            twoFactorAuthenticationCode, request.user
        );
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        await this.userService.turnOnTwoFactorAuthentication(request.user.login);
    }

    @ApiOperation({ summary: 'Generate Two Factor Authentication Secret' }) //endpoint summary on swaggerui
    @ApiOkResponse({ description: 'Two Factor Authentication Secret generated' }) //answer sent back
    @ApiConflictResponse({ description: 'Can\'t generate Two Factor Authentication Secret' }) //not working atm
    @Post('generate')
    @UseGuards(JwtAuthenticationGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);

        // return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }
}