import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('Users')
export class LogInDto {

    @IsNotEmpty()
    @ApiProperty({ example: 'john@gmail.com' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'root123A' })
    password: string;
}

export default LogInDto;