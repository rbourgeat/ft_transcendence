import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Hello world !' })
    content: string;
}

//export default CreateMessageDto;

export class SendMessageToChatDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Hello world !' })
    login: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Hello world !' })
    channel: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Hello world !' })
    content: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Hello world !' })
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'chat-1' })
    type: string;
}