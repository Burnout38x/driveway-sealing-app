/* eslint-disable prettier/prettier */
// src/orders/orders.controller.spec.ts
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { OrdersModule } from './orders.module';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create an order', async () => {
    const response = await request(app.getHttpServer())
      .post('/orders')
      .send({
        quoteId: 1,
        status: 'pending',
        estimatedCompletionTime: '2024-12-01T12:00:00',
        contractorId: 1,
        description: 'Order description',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.status).toBe('pending');
  });

  it('should get all orders for a contractor', async () => {
    const response = await request(app.getHttpServer())
      .get('/orders/1') // Assuming contractorId = 1
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].status).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
