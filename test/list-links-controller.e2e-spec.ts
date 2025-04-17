import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createManyLinks } from './factories/link-factory';
import { createUserAndAuthenticate } from './factories/user-factory';

describe('[GET] /links', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let userToken: string;

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.link.deleteMany();
  });

  beforeAll(async () => {
    app = await makeApp();
    prisma = app.get(PrismaService);
    const { user, accessToken } = await createUserAndAuthenticate(prisma);
    await createManyLinks({ prisma, userId: user.id });
    userToken = accessToken;
    await app.init();
  });

  it('should be able a valid user list all links that are not deleted', async () => {
    const response = await request(app.getHttpServer())
      .get(`/links`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    response.body.map((link) => {
      expect(link).not.toHaveProperty('deleted_at');
      expect(link).not.toHaveProperty('deletedAt');
    });
  });

  it('should be able to an anonymous list links', async () => {
    const response = await request(app.getHttpServer()).get(`/links`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'Missing or invalid Authorization header',
    );
  });
});
