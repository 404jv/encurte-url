import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from './contracts/contract-users-repository';
import { PrismaUsersRepository } from './prisma/prisma-users-repository';
import { LinksRepository } from './contracts/contract-links-repository';
import { PrismaLinksRepository } from './prisma/prisma-links-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: LinksRepository, useClass: PrismaLinksRepository },
  ],
  exports: [UsersRepository, LinksRepository],
})
export class DatabaseModule {}
