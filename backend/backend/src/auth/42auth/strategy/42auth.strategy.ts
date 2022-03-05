import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-42'
import { Auth42Service } from 'src/auth/42auth/42auth.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly authService: Auth42Service) {
        super({
            clientID: process.env.UID,
            clientSecret: process.env.SECRET,
            callbackURL: process.env.IP_REDIRECT,
            scope: ['public']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
        console.log('went by 42auth strategy validate function');
        const { username } = profile;
        const user = {
            login: username,
            email: profile['emails'][0]['value'],
            password: username,
            login42: username
        }
        return this.authService.validateUser(user);
    }
}