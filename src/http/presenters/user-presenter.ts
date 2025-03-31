import { User } from '@prisma/client';

type UserPresenterResponse = {
  id: string;
  name: string;
  email: string;
};

export class UserPresenter {
  static format(user: User): UserPresenterResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
