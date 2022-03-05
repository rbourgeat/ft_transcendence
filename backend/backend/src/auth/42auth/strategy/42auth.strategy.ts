import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Auth42Service } from 'src/auth/42auth/42auth.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy, '42') {
    /*
    constructor(private authenticationService: Auth42Service) {
        super({
            usernameField: 'email'
        });
    }
    async validate(email: string, password: string): Promise<User> {
        console.log('went by validate in local strategy');
        return this.authenticationService.getAuthenticatedUser(email, password);
    }
    */
    constructor(private readonly authService: Auth42Service) {
        super({
            clientID: process.env.UID,
            clientSecret: process.env.SECRET,
            callbackURL: process.env.IP_REDIRECT,
            scope: ['public']
        });
    }

    /*
    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
        const { username } = profile;
        const user = {
            login: username,
            email: profile['emails'][0]['value'],
            password: username,
            login42: username
        }
        return this.authService.validateUser(user);
    }
    */
}