import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    /** check token */
    const token = request.headers.authorization.split(' ')[1];
    const checkToken = this.authService.verifyAccessToken(token);
    console.log(checkToken);
    /** verify token */
    return true;
  }
}
