import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/users/create-user.controller';
import { CreateUserService } from '../services/users/create-user.service';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/contracts/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class HttpModule {}
