import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createUserAndAuthenticate } from './factories/user-factory';

describe('[DELETE] /links/:id', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let userId: string;
  let linkId: string;
  let userToken: string;

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.link.deleteMany();
  });

  beforeAll(async () => {
    app = await makeApp();
    prisma = app.get(PrismaService);
    const { user, accessToken } = await createUserAndAuthenticate(prisma);
    userId = user.id;
    userToken = accessToken;
    await app.init();
  });

  beforeEach(async () => {
    const link = await prisma.link.create({
      data: {
        url: 'https://example.com',
        userId,
        id: '123456',
        totalClicks: 0,
      },
    });
    linkId = link.id;
  });

  it('should be able to a user delete their own link', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/links/${linkId}`)
      .set('Authorization', `Bearer ${userToken}`);

    const link = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    });
    expect(link).toBeNull();
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
