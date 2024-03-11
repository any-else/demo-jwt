import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/auth.dto';
import { UsersService } from '../modules/users/users.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly userService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    const { email } = body;
    /** kiem tra email co ton tai bd hay khong */
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  @HttpCode(201)
  async signIn(@Body() body) {
    /**  */

    const data = await this.authService.signIn(body);

    return {
      message: 'Sign in successfully',
      ...data,
    };
  }
}
