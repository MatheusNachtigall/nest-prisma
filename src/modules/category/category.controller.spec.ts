/**
 * @jest-environment ../../../prisma/prisma-environment-jest
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('Category (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a category', async () => {
    const response: any = await request(app.getHttpServer())
      .post('/category')
      .send({ name: 'Adventure' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Adventure',
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  // it('should NOT create a category with an empty name', async () => {
  //   expect(await controller.create({ name: '' })).toThrowError();
  // });
});
