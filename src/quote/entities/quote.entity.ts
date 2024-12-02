/* eslint-disable prettier/prettier */
// src/quotes/entities/quote.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  propertyDetails: string;

  @Column({ nullable: true })
  additionalNotes: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';

  @Column({ nullable: true })
  description: string; // Optional description

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
