import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/users/create-user.controller';
import { CreateUserService } from '../services/users/create-user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateUserController } from './controllers/users/authenticate-user.controller';
import { AuthenticateUserService } from '../services/users/authenticate-user.service';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    JwtModule.register({
      secret: 'your-secret-key', // Substitua por sua chave secreta
      signOptions: { expiresIn: '1h' }, // Configuração de expiração do token
    }),
  ],
  controllers: [CreateUserController, AuthenticateUserController],
  providers: [CreateUserService, AuthenticateUserService],
})
export class HttpModule {}
