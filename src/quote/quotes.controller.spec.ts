/* eslint-disable prettier/prettier */
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { QuotesModule } from './quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { DataSource } from 'typeorm';

describe('QuotesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        QuotesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Quote],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);

    // Seed the in-memory database with test data
    const quoteRepository = dataSource.getRepository(Quote);
    await quoteRepository.save({
      clientId: 1,
      propertyDetails: '123 Main Street, 500 sq ft',
      additionalNotes: 'Please complete by next week.',
      description: 'A detailed quote for the property at 123 Main Street.',
    });
  }, 30000);

  it('should create a quote', async () => {
    const response = await request(app.getHttpServer())
      .post('/quotes')
      .send({
        clientId: 2,
        propertyDetails: '456 Elm Street, 700 sq ft',
        additionalNotes: 'Urgent request.',
        description: 'A detailed quote for the property at 456 Elm Street.',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.propertyDetails).toBe('456 Elm Street, 700 sq ft');
  });

  it('should get all quotes for a client', async () => {
    const response = await request(app.getHttpServer())
      .get('/quotes/1') // Assuming clientId = 1
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].propertyDetails).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
