import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createLink, createManyLinks } from './factories/link-factory';
import { createUserAndAuthenticate } from './factories/user-factory';

describe('[GET] /links/:id', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let linkId: string;

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.link.deleteMany();
    await prisma.$disconnect();
  });

  beforeAll(async () => {
    app = await makeApp();
    prisma = app.get(PrismaService);
    const { user } = await createUserAndAuthenticate(prisma);
    const links = await createManyLinks({ prisma, userId: user.id });
    linkId = links[0].id;
    await app.init();
  });

  it('should be able to get a valid link and add click', async () => {
    const response = await request(app.getHttpServer()).get(`/${linkId}`);

    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });
    expect(link?.totalClicks).toBe(1);
    expect(response.status).toBe(302);
  });

  it('should return 404 if link does not exist', async () => {
    const invalidLinkId = 'non-existing-link-id';

    const response = await request(app.getHttpServer()).get(
      `/${invalidLinkId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Link not found.');
  });

  it('should return 404 if link is deleted', async () => {
    const { id: deletedLinkId } = await createLink({
      prisma,
      id: '232123',
      deletedAt: new Date(),
    });

    const response = await request(app.getHttpServer()).get(
      `/${deletedLinkId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Link not found.');
  });
});
