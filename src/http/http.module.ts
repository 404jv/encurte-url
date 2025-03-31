import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/users/create-user.controller';
import { CreateUserService } from '../services/users/create-user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class HttpModule {}
