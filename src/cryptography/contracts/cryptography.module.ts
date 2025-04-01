import { Module } from '@nestjs/common';
import { HashGenerator } from './contract-hash-generator';
import { HashComparer } from './contract-hash-comparer';
import { BcryptHasher } from '../bcrypt-hasher';

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
  ],
  exports: [HashGenerator, HashComparer],
})
export class CryptographyModule {}
