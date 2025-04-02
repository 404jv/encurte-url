import { Module } from '@nestjs/common';
import { HashGenerator } from './contracts/contract-hash-generator';
import { HashComparer } from './contracts/contract-hash-comparer';
import { BcryptHasher } from './bcrypt-hasher';

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
  ],
  exports: [HashGenerator, HashComparer],
})
export class CryptographyModule {}
