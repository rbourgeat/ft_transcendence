import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MinLength, Matches, IsOptional, IsDefined } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

@ApiTags('Games') //Create a category on swagger
export class CreateGameDto {
    @IsNotEmpty()
    @ApiProperty()
    login1: UserDto;

    @IsNotEmpty()
    @ApiProperty()
    login2: UserDto;
}
