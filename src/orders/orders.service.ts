/* eslint-disable prettier/prettier */
// src/orders/orders.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    const savedOrder = await this.orderRepository.save(order);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: savedOrder,
    };
  }

  // Get all orders
  async findAll() {
    const orders = await this.orderRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'Orders retrieved successfully',
      data: orders,
    };
  }

  // Get an order by ID
  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Order not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Order retrieved successfully',
      data: order,
    };
  }

  // Update an order by ID
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Order not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(order, updateOrderDto);
    const updatedOrder = await this.orderRepository.save(order);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
      data: updatedOrder,
    };
  }

  // Delete an order
  async remove(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Order not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.orderRepository.remove(order);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfully',
      data: null,
    };
  }
}
