import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import TokenPayload from './interface/tokenPayload.interface';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(Strategy, 'jwt-two-factor') {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: process.env.WT_ACCESS_TOKEN_SECRET
        });
    }

    async validate(payload: TokenPayload) {
        console.log('validate function for 2FA, gonna get user by id');
        const user = await this.userService.getById(payload.userId);
        if (!user.isTwoFactorAuthenticationEnabled)
            return user;
        if (payload.isSecondFactorAuthenticated)
            return user;
    }
}