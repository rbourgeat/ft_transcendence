import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.FORTYTWO_CLIENT_ID,
            clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
            callbackURL: '/api/42auth/redirect',
            passReqToCallback: true,
        });
    }

    async validate(
        request: { session: { accessToken: string } },
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback,
    ): Promise<any> {
        request.session.accessToken = accessToken;
        console.log('accessToken', accessToken, 'refreshToken', refreshToken);

        const { username } = profile;
        const user = {
            login: username,
            email: profile['emails'][0]['value'],
            password: username,
        }
        console.log('login:' + user.login + ' email:' + user.email + ' password: ' + user.password);
        this.userService.createUser42(user); //save the user in the db :)
        return cb(null, profile);
    }
}
