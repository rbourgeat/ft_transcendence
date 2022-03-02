import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length, IsAlphanumeric, MinLength, Matches } from 'class-validator';
import { Match } from './match.decorator';

@ApiTags('Auth') //Create a category on swagger
export class RegisterDto {
    @IsNotEmpty()
    @Length(4, 20)
    @IsAlphanumeric()
    @ApiProperty()
    login: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'password is too weak, it must have minimum 8 characters, at least 1 letter and 1 number', })
    @ApiProperty({ description: 'minimum 8 characters, at least 1 uppercase, 1 lowercase and 1 number' })
    password: string;

    @IsNotEmpty()
    @Match('password', { message: 'password doesn\'t match' })
    @ApiProperty({ description: 'password confirmation has to match initial password' })
    password_confirmation: string;
}

export default RegisterDto;