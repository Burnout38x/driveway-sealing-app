/* eslint-disable prettier/prettier */
// src/quotes/quotes.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  // Create a new quote
  async create(createQuoteDto: CreateQuoteDto) {
    const quote = this.quotesRepository.create(createQuoteDto);
    const savedQuote = await this.quotesRepository.save(quote);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Quote created successfully',
      data: savedQuote,
    };
  }

  // Get all quotes for a client
  async findAll(clientId: number) {
    const quotes = await this.quotesRepository.find({ where: { clientId } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Quotes retrieved successfully',
      data: quotes,
    };
  }

  // Get a single quote by ID
  async findOne(id: number) {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (!quote) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Quote not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Quote retrieved successfully',
      data: quote,
    };
  }

  // Update a quote
  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (!quote) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Quote not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(quote, updateQuoteDto);
    const updatedQuote = await this.quotesRepository.save(quote);
    return {
      statusCode: HttpStatus.OK,
      message: 'Quote updated successfully',
      data: updatedQuote,
    };
  }

  // Delete a quote
  async remove(id: number) {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (!quote) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Quote not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.quotesRepository.remove(quote);
    return {
      statusCode: HttpStatus.OK,
      message: 'Quote deleted successfully',
      data: null,
    };
  }
}
