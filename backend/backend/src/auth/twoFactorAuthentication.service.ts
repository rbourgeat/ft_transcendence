import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
 
@Injectable()
export class TwoFactorAuthenticationService {
  constructor (
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
 
    const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
 
    await this.userService.setTwoFactorAuthenticationSecret(user.login, secret);
 
    return {
      secret,
      otpauthUrl
    }
  }
}