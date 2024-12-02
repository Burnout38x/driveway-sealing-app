/* eslint-disable prettier/prettier */
// src/orders/entities/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quoteId: number;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  description: string; // New description column

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
