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
    @ApiProperty({ example: 'chat-1' })
    name: string;
}

// @ApiTags('Chats') //Create a category on swagger
// export class PasswordChatDto {
//     @IsOptional()
//     @ApiProperty({ description: 'password null == désactivate' })
//     password: string;
// }

@ApiTags('Chats') //Create a category on swagger
export class ChatDto {
    @IsNotEmpty()
    @ApiProperty()
    idChat: number;

    @IsOptional()
    @ApiProperty()
    user: string;

    @IsOptional()
    @ApiProperty()
    time: Date;

    @IsOptional()
    @ApiProperty()
    password: string;
}
