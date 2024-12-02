/* eslint-disable prettier/prettier */
// src/quotes/quotes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { Quote } from './entities/quote.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard'; // Import the guard

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuotesController],
  providers: [QuotesService, JwtAuthGuard], // Provide the JWT Guard here if needed
  exports: [QuotesService],
})
export class QuotesModule {}
