/* eslint-disable prettier/prettier */
// src/bills/bills.controller.spec.ts
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BillsModule } from './bills.module';

describe('BillsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BillsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a bill', async () => {
    const response = await request(app.getHttpServer())
      .post('/bills')
      .send({
        orderId: 1,
        amount: 1500,
        dueDate: '2024-12-15T00:00:00',
        description: 'Bill description',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.amount).toBe(1500);
  });

  it('should get all bills for a client', async () => {
    const response = await request(app.getHttpServer())
      .get('/bills/1') // Assuming clientId = 1
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].amount).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
