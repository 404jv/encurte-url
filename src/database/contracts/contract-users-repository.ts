import { User } from '@prisma/client';

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export abstract class UsersRepository {
  abstract create: (data: CreateUser) => Promise<User>;
}
