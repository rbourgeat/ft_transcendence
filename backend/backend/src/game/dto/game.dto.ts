import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MinLength, Matches, IsOptional, IsDefined } from 'class-validator';
import { GameUserDto } from 'src/user/dto/user.dto';

@ApiTags('Games') //Create a category on swagger
export class CreateGameDto {
    @IsNotEmpty()
    @ApiProperty()
    login1: GameUserDto;

    @IsNotEmpty()
    @ApiProperty()
    login2: GameUserDto;
}
