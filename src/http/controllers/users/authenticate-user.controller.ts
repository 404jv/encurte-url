import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticateUserService } from '../../../services/users/authenticate-user.service';
import { ApiError } from '../../../services/errors/api-error';

type Body = {
  email: string;
  password: string;
};

@Controller('/users/login')
export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body()
    { email, password }: Body,
  ) {
    if (!password || !email) {
      throw new ApiError({
        message: 'All fields are required.',
        statusCode: 400,
      });
    }
    const result = await this.authenticateUserService.execute({
      email,
      password,
    });
    return result;
  }
}
