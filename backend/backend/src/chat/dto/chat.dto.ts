import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MinLength, Matches, IsOptional, IsDefined } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

@ApiTags('Chats') //Create a category on swagger
export class CreateChatDto {
    /*
    @IsNotEmpty()
    @ApiProperty()
    owner: string;

    @IsOptional()
    @ApiProperty()
    members: string[];
    */
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
