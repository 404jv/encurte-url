import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createUser } from './factories/user-factory';

describe('[POST] /links', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  beforeEach(async () => {
    app = await makeApp();
    prisma = app.get(PrismaService);
    await app.init();
  });

  it('should be able to create a user', async () => {
    const response = await request(app.getHttpServer()).post('/links').send({
      url: 'https://example.com',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).not.toHaveProperty('deletedAt');
    expect(response.body).not.toHaveProperty('deleted_at');
    expect(response.body.user_id).toBeNull();
    expect(response.body.total_clicks).toBe(0);
  });

  it('should return 400 if url is not defined', async () => {
    const response = await request(app.getHttpServer()).post('/links').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });

  it('should return 400 if url is invalid', async () => {
    const response = await request(app.getHttpServer()).post('/links').send({
      url: 'invalid-url',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('URL inválida');
  });

  it('should be able to create a link with user id', async () => {
    await createUser(prisma);
    const tokenRequest = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'jhon@email.com',
        password: 'super123',
      });
    const token = tokenRequest.body.accessToken;

    const response = await request(app.getHttpServer())
      .post('/links')
      .auth(token, { type: 'bearer' })
      .send({
        url: 'https://example.com',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).not.toHaveProperty('deletedAt');
    expect(response.body.total_clicks).toBe(0);
    expect(response.body.user_id).toBeDefined();
  });
});
