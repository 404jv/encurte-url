import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ErrorHandler } from '../../src/error-handler';

export async function makeApp() {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new ErrorHandler());

  return app;
}
