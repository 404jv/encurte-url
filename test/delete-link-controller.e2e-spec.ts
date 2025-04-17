import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createUserAndAuthenticate } from './factories/user-factory';
import { createLink } from './factories/link-factory';

describe('[DELETE] /links/:id', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let userId: string;
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

  it('should be able to a user delete their own link', async () => {
    const link = await createLink({ prisma, userId });

    const response = await request(app.getHttpServer())
      .delete(`/links/${link.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    const linkDeleted = await prisma.link.findUnique({
      where: {
        id: link.id,
      },
    });
    expect(linkDeleted?.deletedAt).toBeTruthy();
    expect(linkDeleted).toBeTruthy();
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('should not be able to a user delete others links', async () => {
    const linkWithoutOwner = await createLink({ prisma, id: '654321' });

    const response = await request(app.getHttpServer())
      .delete(`/links/${linkWithoutOwner.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    const link = await prisma.link.findUnique({
      where: {
        id: '654321',
      },
    });
    expect(link).toBeTruthy();
    expect(link?.deletedAt).toBeNull();
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'You are not allowed to delete this link.',
    );
  });

  it('should return 404 when link id doest not exists', async () => {
    const invalidLinkId = 'non-existing-id';

    const response = await request(app.getHttpServer())
      .delete(`/links/${invalidLinkId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Link not found.');
  });
});
