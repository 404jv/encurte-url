import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../database/contracts/contract-users-repository';
import { JwtService } from '@nestjs/jwt';
import { ApiError } from '../errors/api-error';
import { HashComparer } from '../../cryptography/contracts/contract-hash-comparer';

type Request = {
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
};

@Injectable()
export class AuthenticateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private hashComparer: HashComparer,
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);
    if (user === null) {
      throw new ApiError({
        message: 'Invalid Credentials.',
        statusCode: 401,
      });
    }
    const isValidPassword = await this.hashComparer.compare(
      password,
      user.password,
    );
    if (isValidPassword === false) {
      throw new ApiError({
        message: 'Invalid Credentials.',
        statusCode: 401,
      });
    }
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });
    return {
      accessToken: accessToken,
    };
  }
}
