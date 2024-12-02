/* eslint-disable prettier/prettier */
// src/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';  // Import the guard
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';  // Import Swagger decorators

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()  // Add this line to enable Bearer token authentication
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data.',
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of all orders.',
  })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully fetched.',
  })
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
  })
  async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
