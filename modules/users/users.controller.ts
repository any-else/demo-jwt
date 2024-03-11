import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/list')
  @UseGuards(AuthGuard) /** kiểm tra xem có tài khoản hay ch*/
  async getAll() {
    return this.usersService.getAll();
  }
}
