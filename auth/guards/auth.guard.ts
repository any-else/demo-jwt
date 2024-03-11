import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();

    /** check token */
    const token = request.headers.authorization;

    if (!token?.startsWith('Bearer')) throw new UnauthorizedException();

    const newToken = token?.split(' ')[1];
    const userToken = this.authService.verifyAccessToken(newToken);
    /** tìm trong database xem có tồn tại hay không */

    if (!userToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    request['user'] = userToken;

    /** verify token */
    return true;
  }
}
