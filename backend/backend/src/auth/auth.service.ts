import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import RegisterDto from 'src/auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from 'src/auth/interface/tokenPayload.interface';
import PostgresErrorCode from 'src/auth/utils/postgresErrorCodes.enum';

//IMPORTANT either use argon2 or bcrypt package to hash password.
//Not in use atm because not working on mac. Leave line with those package commented. It's working, we'll enable it late
//import * as argon2 from "argon2";
//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    public async getUserFromAuthenticationToken(token: string) {
        const payload: TokenPayload = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
        });
        if (payload.userId) {
            return this.usersService.getById(payload.userId);
        }
    }

    public async register(registrationData: RegisterDto) {
        console.log('went by register in auth service');
        //const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        //const hashedPassword = await argon2.hash(registrationData.password);
        const hashedPassword = registrationData.password;
        try {
            const createdUser = await this.usersService.create({ ...registrationData, password: hashedPassword });
            createdUser.password = undefined;
            console.log('SUCESS: new user registered');
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Classic
    public getCookieWithJwtToken(userId: number) {
        console.log('went by getcookiewithjwttoken in auth service');
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
    }

    //2FA
    public getCookieWithJwtAccessToken(userId: number, isSecondFactorAuthenticated = false) {
        const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`
        });
        return `Authentication=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
    }

    public getCookieForLogOut() {
        console.log('went by getcookieforlogout in auth service');
        return `Authentication=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        console.log('went by getcauthenticateduser in auth service');
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        console.log('went by verifypassword in auth service');
        //const isPasswordMatching = await bcrypt.compare(
        /*
        const isPasswordMatching = await argon2.verify(
            plainTextPassword,
            hashedPassword
        );
        */
        //if (!isPasswordMatching) {
        if (plainTextPassword != hashedPassword) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
}