import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetIdAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload: any = jwt.verify(
          token,
          process.env.JWT_SECRET || 'secret',
        );
        request.user = { id: payload.sub };
      } catch (_e) {
        console.error(_e);
        return false;
      }
    }

    return true;
  }
}
