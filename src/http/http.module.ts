import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/users/create-user.controller';
import { CreateUserService } from '../services/users/create-user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateUserController } from './controllers/users/authenticate-user.controller';
import { AuthenticateUserService } from '../services/users/authenticate-user.service';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { JwtModule } from '@nestjs/jwt';
import { CreateLinkController } from './controllers/links/create-link.controller';
import { CreateLinkService } from '../services/links/create-link.service';
import { DeleteLinkController } from './controllers/links/delete-link.controller';
import { DeleteLinkService } from '../services/links/delete-link.service';
import { ListLinksService } from '../services/links/list-links.service';
import { ListLinksController } from './controllers/links/list-links.controller';
import { UpdateLinkController } from './controllers/links/update-link.controller';
import { UpdateLinkService } from '../services/links/update-link.service';
import { GetLinkController } from './controllers/links/get-link.controller';
import { GetLinkService } from '../services/links/get-link.service';

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
    DeleteLinkController,
    ListLinksController,
    UpdateLinkController,
    GetLinkController,
  ],
  providers: [
    CreateUserService,
    AuthenticateUserService,
    CreateLinkService,
    DeleteLinkService,
    ListLinksService,
    UpdateLinkService,
    GetLinkService,
  ],
})
export class HttpModule {}
