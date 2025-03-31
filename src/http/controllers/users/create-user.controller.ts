import { UserPresenter } from '../../presenters/user-presenter';
import { CreateUserService } from '../../../services/users/create-user.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

type Body = {
  name: string;
  email: string;
  password: string;
};

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body()
    { name, email, password }: Body,
  ) {
    const result = await this.createUserService.execute({
      name,
      email,
      password,
    });
    const user = UserPresenter.format(result);
    return user;
  }
}
