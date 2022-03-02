import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Auth42Service } from './42auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy) {
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
}