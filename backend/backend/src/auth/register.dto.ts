import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('Auth') //Create a category on swagger
export class RegisterDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}

export default RegisterDto;