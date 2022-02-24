import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MinLength, Matches, IsOptional, IsDefined } from 'class-validator';
import { Match } from './match.decorator';

/**
 * Fields needed and checked to create a user without 42api
 */

@ApiTags('Users') //Create a category on swagger
export class CreateUserDto {
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
    @ApiProperty({ description: 'minimum 8 characters, at least 1 letter and 1 number' })
    password: string;

    @IsNotEmpty()
    @Match('password', { message: 'password doesn\'t match' })
    @ApiProperty({ description: 'password confirmation has to match initial password' })
    password_confirmation: string;
}

/**
 * Possible update user information (change password or chang email)
 * TODO if password field present make required the pass_confirmation field. No idea how to play with IsOpt atm
 */

@ApiTags('Users')
export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsOptional()
    @MinLength(8)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'password is too weak, it must have minimum 8 characters, at least 1 letter and 1 number', })
    @ApiProperty({ description: 'minimum 8 characters, at least 1 letter and 1 number' })
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @Match('password', { message: 'password doesn\'t match' })
    @ApiProperty({ description: 'password confirmation has to match initial password' })
    password_confirmation: string;
}


//WIP might be deleted
export class CreateUserDtoTest {
    email: string;
    login: string;
    password: string;
}

export default CreateUserDtoTest;