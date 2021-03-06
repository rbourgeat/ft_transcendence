import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
export class TwoFactorAuthenticationCodeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    twoFactorAuthenticationCode: string;
}