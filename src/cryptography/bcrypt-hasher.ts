import { compare, hash } from 'bcryptjs';
import { HashComparer } from './contracts/contract-hash-comparer';
import { HashGenerator } from './contracts/contract-hash-generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
