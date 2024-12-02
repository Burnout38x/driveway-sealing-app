/* eslint-disable prettier/prettier */
// src/orders/dto/update-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'The status of the order.',
    example: 'completed',
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

  @ApiProperty({
    description: 'An optional description of the order update.',
    example: 'Order delivered successfully.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
