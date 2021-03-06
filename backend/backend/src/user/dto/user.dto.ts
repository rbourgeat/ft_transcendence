import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MinLength, Matches } from 'class-validator';
import { Match } from 'src/user/utils/match.decorator';

@ApiTags('Users')
export class UpdateUserDto {
    @IsNotEmpty()
    @Length(4, 20)
    @IsAlphanumeric()
    @ApiProperty()
    login: string;
}

@ApiTags('Users')
export class PatchNameDto {
    @ApiProperty()
    oldlogin: string;

    @IsNotEmpty()
    @Length(4, 15)
    @IsAlphanumeric()
    @ApiProperty()
    newlogin: string;
}

@ApiTags('Users')
export class UserDto {
    @IsNotEmpty()
    @Length(4, 20)
    @IsAlphanumeric()
    @ApiProperty()
    login: string;
}

export class UploadAvatarDto {
    name: string;
}

@ApiTags('Auth')
export class CreateUserDtoViaRegistration {
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

export default CreateUserDtoViaRegistration;

@ApiTags('42Auth')
export class User42Dto {
    login42: string;
    login: string;
    email: string;
    password: string;
    avatar: string;
}
