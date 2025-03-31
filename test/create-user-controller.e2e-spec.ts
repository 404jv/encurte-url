import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';

describe('[POST] /users', () => {
  let app: INestApplication<App>;

  afterAll(async () => {
    const prisma = new PrismaService();
    await prisma.user.deleteMany();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to create a user', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'super123',
    });

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.password).toBeFalsy();
  });
});
