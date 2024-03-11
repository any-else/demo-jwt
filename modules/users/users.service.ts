import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  createUser(user) {
    return this.usersRepository
      .createQueryBuilder('users')
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();
  }

  getAll() {
    return this.usersRepository.find();
  }

  getUserById(id: number) {
    return this.usersRepository.findOneBy({ user_id: id });
  }
}
