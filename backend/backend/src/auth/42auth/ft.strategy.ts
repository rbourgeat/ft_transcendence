import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly userService: UserService,
        private readonly authenticationService: AuthService) {
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
        console.log('start of login 42');
        request.session.accessToken = accessToken;
        console.log('accessToken', accessToken, 'refreshToken', refreshToken);

        const { username } = profile;
        console.log(profile);
        const user = {
            login42: username,
            login: username,
            email: profile['emails'][0]['value'],
            password: username,
            avatar: profile['photos'][0]['value'] //image_url
        }
        await this.userService.createUser42(user); //save the user in the db :)
        console.log('end of login 42');

        return cb(null, profile);
    }
}
