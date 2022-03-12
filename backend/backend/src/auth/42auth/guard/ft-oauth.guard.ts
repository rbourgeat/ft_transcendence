import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class FtOauthGuard extends AuthGuard('42') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('canactivate in ftoauthguard');
        const activate: boolean = (await super.canActivate(context)) as boolean;
        console.log('test1');
        const request: Request = context.switchToHttp().getRequest();
        console.log(activate);
        console.log('test1');
        await super.logIn(request);
        console.log(activate);
        console.log('test1');
        return activate;
    }
}