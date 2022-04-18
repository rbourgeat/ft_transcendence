import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthService) {
        super({
            usernameField: 'email'
        });
    }
    async validate(email: string, password: string): Promise<User> {
        return this.authenticationService.getAuthenticatedUser(email, password);
    }
}