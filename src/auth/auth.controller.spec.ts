/* eslint-disable prettier/prettier */
// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = {
      id: 1,
      email: 'user@example.com',
      name: 'Test User',
      role: 'client', // or 'contractor'
      password: 'password123', // Add the missing field
    };

    jest.spyOn(service, 'register').mockResolvedValue(result);
    expect(
      await controller.register({
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'client',
      }),
    ).toEqual(result);
  });

  it('should login a user', async () => {
    const result = {
      access_token: 'jwt_token',
      user: {
        id: 1,
        email: 'user@example.com',
        name: 'Test User',
        role: 'client',
        password: 'password123',
      },
    };
    jest.spyOn(service, 'login').mockResolvedValue(result);
    expect(
      await controller.login({
        email: 'user@example.com',
        password: 'password123',
      }),
    ).toEqual(result);
  });
});
