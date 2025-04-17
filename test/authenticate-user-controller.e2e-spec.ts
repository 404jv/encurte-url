import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';
import { createUser } from './factories/user-factory';

describe('[POST] /users/login', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await makeApp();
    prisma = app.get(PrismaService);
    await createUser(prisma);
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it('should be able to authenticate', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'jhon@email.com',
        password: 'super123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('should return 401 when email is not valid', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'invalid_email@email.com',
        password: 'super123',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid Credentials.');
  });

  it('should return 401 when password is not valid', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'jhon@email.com',
        password: 'invalid_password',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid Credentials.');
  });

  it('should return 400 when password is not defined', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'jhon@email.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });

  it('should return 400 when email is not defined', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        password: 'super123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });
});
