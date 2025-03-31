import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  CreateUser,
  UsersRepository,
} from '../contracts/contract-users-repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUser): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
