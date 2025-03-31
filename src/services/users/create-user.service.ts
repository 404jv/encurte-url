import { Injectable } from '@nestjs/common';
import {
  CreateUser,
  UsersRepository,
} from '../../database/contracts/contract-users-repository';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUser): Promise<User> {
    return await this.usersRepository.create({ name, email, password });
  }
}
