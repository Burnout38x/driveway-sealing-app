/* eslint-disable prettier/prettier */
// src/quotes/quotes.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';  // Import the guard
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';  // Import Swagger decorators

@ApiTags('Quotes')
@Controller('quotes')
@ApiBearerAuth()  // Add this line to enable Bearer token authentication
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protect the route
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiResponse({
    status: 201,
    description: 'The quote has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data.',
  })
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    return await this.quotesService.create(createQuoteDto);
  }

  @Get(':clientId')
  @UseGuards(JwtAuthGuard) // Protect the route
  @ApiOperation({ summary: 'Get all quotes for a client' })
  @ApiResponse({
    status: 200,
    description: 'List of all quotes for the client.',
  })
  async findAll(@Param('clientId') clientId: number) {
    return await this.quotesService.findAll(clientId);
  }

  @Get('details/:id')
  @UseGuards(JwtAuthGuard) // Protect the route
  @ApiOperation({ summary: 'Get quote details by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quote details have been successfully fetched.',
  })
  async findOne(@Param('id') id: number) {
    return await this.quotesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protect the route
  @ApiOperation({ summary: 'Update a quote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully updated.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    return await this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protect the route
  @ApiOperation({ summary: 'Delete a quote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    await this.quotesService.remove(id);
    return { message: 'Quote deleted successfully' };
  }
}
