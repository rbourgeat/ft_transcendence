import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    Body,
    UnauthorizedException, HttpCode,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import JwtAuthenticationGuard from './guard/jwt-authentication.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';
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

    @Post('generate')
    @UseGuards(JwtAuthenticationGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);

        // For swagger DL qrcode file ability
        //response.setHeader('Content-disposition', 'attachment');
        //response.setHeader('Content-type', 'multipart/formdata');
        //
        console.log('generate a QRCODE for 2FA');
        return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Post('turn-on')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async turnOnTwoFactorAuthentication(
        @Req() request: RequestWithUser,
        @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto
    ) {
        console.log('enter in turnon 2fa');
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
            twoFactorAuthenticationCode, request.user
        );
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
    }

    @Post('authenticate')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async authenticate(
        @Req() request: RequestWithUser,
        @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto
    ) {
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
            twoFactorAuthenticationCode, request.user
        );
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        console.log('authenticate with 2fa, then gonna set coookie and jwt');
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);

        request.res.setHeader('Set-Cookie', [accessTokenCookie]);

        return request.user;
    }
}