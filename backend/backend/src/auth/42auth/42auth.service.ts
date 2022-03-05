import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { User42Dto } from 'src/user/dto/user.dto';

@Injectable()
export class Auth42Service {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async validateUser(userData: User42Dto): Promise<User> {
        return this.usersService.validateUser42(userData);
    }

    createUser(userData: User42Dto): Promise<User> {
        return this.usersService.createUser42(userData);
    }
}
