import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsAlphanumeric, Length } from 'class-validator';

@ApiTags('Chats')
export class CreateChatDto {
    @IsOptional()
    @IsAlphanumeric()
    @ApiProperty()
    password: string;

    @IsOptional()
    @ApiProperty()
    public: boolean;

    @IsNotEmpty()
    @ApiProperty({ example: 'chat-1' })
    name: string;
}

@ApiTags('Chats')
export class MuteDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    mute: boolean;

    @ApiProperty()
    chatName: string;

    @ApiProperty()
    time: Date;

    @ApiProperty()
    admin: string;
}

@ApiTags('Chats')
export class BanDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    ban: boolean;

    @ApiProperty()
    chatName: string;

    @ApiProperty()
    admin: string;
}

@ApiTags('Chats')
export class AdminDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    chatName: string;

    @ApiProperty()
    admin: string;
}

@ApiTags('Chats')
export class LeaveDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    chatName: string;
}

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
