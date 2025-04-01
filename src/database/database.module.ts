import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from './contracts/contract-users-repository';
import { PrismaUsersRepository } from './prisma/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
