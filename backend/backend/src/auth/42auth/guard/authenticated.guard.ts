import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('canactivate in authenticatedguard');
        const req: Request = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
}