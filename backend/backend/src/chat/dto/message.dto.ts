import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Hello world !' })
    content: string;
}

export default CreateMessageDto;