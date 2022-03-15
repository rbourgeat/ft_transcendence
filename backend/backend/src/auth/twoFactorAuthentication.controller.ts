import { ClassSerializerInterceptor, Controller, Post, UseInterceptors, Res, UseGuards, Req, Body, UnauthorizedException, HttpCode } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import JwtAuthenticationGuard from './guard/jwt-authentication.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import { ApiTags, ApiOkResponse, ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from './dto/turnOnTwoFactorAuthentication.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('api/2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
        private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
        private readonly usersService: UserService,
        private readonly authenticationService: AuthService
    ) { }

    @ApiOperation({ summary: 'generate a 2FA QRcode [jwt-protected]' })
    @ApiOkResponse({ description: '2FA QRcode created' })
    @ApiConflictResponse({ description: 'Fail to create 2FA QRcode' })
    @Post('generate')
    @UseGuards(JwtAuthenticationGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
        console.log('generate a QRCODE for 2FA');
        return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }

    @ApiOperation({ summary: 'turn-on 2FA [jwt-protected]' })
    @ApiOkResponse({ description: '2FA turned on' })
    @ApiConflictResponse({ description: 'Fail to turn-on 2FA' })
    @Post('turn-on')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async turnOnTwoFactorAuthentication(@Req() request: RequestWithUser, @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto) {
        console.log('enter in turn-on 2fa');
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, request.user);
        if (!isCodeValid)
            throw new UnauthorizedException('Wrong authentication code');
        await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
    }

    @ApiOperation({ summary: 'authenticate with 2FA [jwt-protected]' })
    @ApiOkResponse({ description: '2FA authentication suceed' })
    @ApiConflictResponse({ description: '2FA authentication failed' })
    @Post('log-in')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async logIn(@Req() request: RequestWithUser, @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto) {
        console.log('enter in login with 2fa');
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, request.user);
        if (!isCodeValid)
            throw new UnauthorizedException('Wrong authentication code');
        console.log('2fa code valid, we gonna set coookie and jwt');
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);
        request.res.setHeader('Set-Cookie', [accessTokenCookie]);
        return request.user;
    }
}