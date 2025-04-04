import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/users/create-user.controller';
import { CreateUserService } from '../services/users/create-user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateUserController } from './controllers/users/authenticate-user.controller';
import { AuthenticateUserService } from '../services/users/authenticate-user.service';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { JwtModule } from '@nestjs/jwt';
import { CreateLinkController } from './controllers/links/create-link.controller';
import { CreateLinkService } from '../services/users/create-link.service';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    CreateLinkController,
  ],
  providers: [CreateUserService, AuthenticateUserService, CreateLinkService],
})
export class HttpModule {}
