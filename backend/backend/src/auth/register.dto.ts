import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('Auth') //Create a category on swagger
export class RegisterDto {
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    login: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export default RegisterDto;