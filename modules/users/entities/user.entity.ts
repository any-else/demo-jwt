import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  USER,
  ADMIN,
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: '100',
  })
  user_name: string;

  @Column({
    type: 'varchar',
    length: '100',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '155',
  })
  password: string;

  @Column({
    type: 'longtext',
  })
  avatar: string;

  @Column({
    type: 'int',
    default: Role.USER,
  })
  role: Role;
}
