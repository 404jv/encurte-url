import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createUserAndAuthenticate } from './factories/user-factory';
import { createLink } from './factories/link-factory';

describe('[PUT] /links', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let token: string;
  let linkId: string;

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.link.deleteMany();
  });

  beforeAll(async () => {
    app = await makeApp();
    prisma = app.get(PrismaService);
    const { accessToken, user } = await createUserAndAuthenticate(prisma);
    token = accessToken;
    const { id } = await createLink({ prisma, userId: user.id });
    linkId = id;
    await app.init();
  });

  it('should be able to update a link', async () => {
    const response = await request(app.getHttpServer())
      .put(`/links/${linkId}`)
      .auth(token, { type: 'bearer' })
      .send({
        url: 'https://new.example.com',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).not.toHaveProperty('deletedAt');
    expect(response.body.total_clicks).toBe(0);
    expect(response.body.user_id).toBeDefined();
    expect(response.body.origin_url).toBe('https://new.example.com');
  });

  it('should return 404 if link does not exist', async () => {
    const invalidLinkId = 'non-existing-link-id';

    const response = await request(app.getHttpServer())
      .put(`/links/${invalidLinkId}`)
      .auth(token, { type: 'bearer' })
      .send({
        url: 'https://new.example.com',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Link not found.');
  });

  it('should return 400 if url is not defined', async () => {
    const response = await request(app.getHttpServer())
      .put(`/links/${linkId}`)
      .auth(token, { type: 'bearer' })
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });
});
