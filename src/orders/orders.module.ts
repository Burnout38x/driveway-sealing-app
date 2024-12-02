/* eslint-disable prettier/prettier */
// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard'; // Import the guard

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, JwtAuthGuard], // Provide the JWT Guard here if needed
  exports: [OrdersService],
})
export class OrdersModule {}
