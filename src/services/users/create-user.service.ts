import { Injectable } from '@nestjs/common';
import {
  CreateUser,
  UsersRepository,
} from '../../database/contracts/contract-users-repository';
import { User } from '@prisma/client';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';
import { HashGenerator } from '../../cryptography/contracts/contract-hash-generator';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }: CreateUser): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists !== null) {
      throw new ResourceAlreadyExistsError('User', 'email', email);
    }
    const passwordHash = await this.hashGenerator.hash(password);
    return await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
