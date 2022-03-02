import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MinLength, Matches, IsOptional, IsDefined } from 'class-validator';
import { CreateUserDto } from 'src/user/user.dto';

@ApiTags('Games') //Create a category on swagger
export class CreateGameDto {
    @IsNotEmpty()
    @ApiProperty()
    login1: CreateUserDto;

    @IsNotEmpty()
    @ApiProperty()
    login2: CreateUserDto;
}
