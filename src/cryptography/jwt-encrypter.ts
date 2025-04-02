import { JwtService } from '@nestjs/jwt';
import { Encrypter } from './contracts/contract-encrypter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
