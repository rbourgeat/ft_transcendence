import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsAlphanumeric, Length } from 'class-validator';

@ApiTags('Chats')
export class CreateChatDto {
    @IsOptional()
    @IsAlphanumeric()
    @Length(4, 10)
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
export class PasswordChatDto {
    @IsOptional()
    @ApiProperty({ description: 'password null == désactivate' })
    password: string = null;
}
