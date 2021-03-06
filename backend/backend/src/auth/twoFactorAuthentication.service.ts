import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly userService: UserService,
  ) { }

  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, secret);
    await this.userService.setTwoFactorAuthenticationSecret(secret, user.id);
    return { secret, otpauthUrl }
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    stream.setHeader('Content-type', 'image/png'); // To have QRcode directly in swagger
    return toFileStream(stream, otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
    return authenticator.verify({ token: twoFactorAuthenticationCode, secret: user.twoFactorAuthenticationSecret })
  }
}