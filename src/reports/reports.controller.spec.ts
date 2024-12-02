/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { ReportsService } from './reports.service';

describe('ReportsController (e2e)', () => {
  let app: INestApplication;
  let reportsService: ReportsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    reportsService = moduleFixture.get<ReportsService>(ReportsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should generate revenue report', async () => {
    // Mocking the ReportsService.getReport method to avoid dependency on database
    jest.spyOn(reportsService, 'getReport').mockImplementation(async () => ({
      totalRevenue: 5000,
    }));

    const response = await request(app.getHttpServer())
      .get('/reports/revenue')
      .expect(200);

    expect(response.body).toHaveProperty('totalRevenue');
    expect(typeof response.body.totalRevenue).toBe('number');
    expect(response.body.totalRevenue).toBe(5000);
  });
});
