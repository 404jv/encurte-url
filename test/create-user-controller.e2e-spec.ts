import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { makeApp } from './factories/app-factory';

describe('[POST] /users', () => {
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
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'super123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.password).toBeFalsy();
  });

  it('should return 409 when try to create user with same email', async () => {
    await prisma.user.create({
      data: {
        name: 'Maria Doe',
        email: 'email_existing@email.com',
        password: 'super123',
      },
    });

    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Evan Doe',
      email: 'email_existing@email.com',
      password: 'super123',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      'User with email email_existing@email.com already exists.',
    );
  });

  it('should return 400 when name is not defined', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: 'mariadoe@email.com',
      password: 'super123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });

  it('should return 400 when email is not defined', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Maria Doe',
      password: 'super123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });

  it('should return 400 when password is not defined', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Maria Doe',
      email: 'mariadoe@email.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required.');
  });
});
