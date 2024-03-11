import { UsersService } from './../modules/users/users.service';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dtos/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const { password, ...rest } = body;
    /** logic max hoa password */
    const hashPassword = await argon2.hash(password);

    const newUser = {
      ...rest,
      password: hashPassword,
    };

    await this.userService.createUser(newUser);
    return {
      message: 'User created successfully',
    };
  }

  async signIn(userInfo) {
    /** check thong tin user */
    const user = await this.userService.getUserByEmail(userInfo.email);
    const isMatch =
      user && (await argon2.verify(user.password, userInfo.password));
    if (!user || !isMatch) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    /** san sinh token  */
    return {
      token: await this.generateAccessToken({
        email: user.email,
        id: user.user_id,
      }),
    };
  }

  async generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: 'token',
    });
  }

  async verifyAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: 'token',
    });
  }
}
