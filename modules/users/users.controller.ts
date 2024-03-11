import {
  Controller,
  Get,
  Param,
  SetMetadata,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/author.guard';

const PUBLISH_KEY = 'isPublic';
export const Publish = () => SetMetadata(PUBLISH_KEY, true); // custom 1 decorator

@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @UseGuards(AuthGuard, RolesGuard)
  async createUser(@Body() user) {
    return this.usersService.createUser(user);
  }

  @Get('/list')
  @UseGuards(AuthGuard) /** kiểm tra xem có tài khoản hay ch*/
  async getAll() {
    return this.usersService.getAll();
  }

  @Publish()
  @Get('/:user_id')
  async getUserById(@Param('user_id') user_id: string) {
    return this.usersService.getUserById(+user_id);
  }
}
