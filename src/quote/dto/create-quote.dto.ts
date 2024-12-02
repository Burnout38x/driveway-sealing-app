/* eslint-disable prettier/prettier */
// src/quotes/dto/create-quote.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty({
    description: 'The client ID associated with the quote.',
    example: 1234,
  })
  @IsNumber()
  clientId: number;

  @ApiProperty({
    description: 'Details about the property related to the quote.',
    example: '2-bedroom apartment at XYZ street.',
  })
  @IsString()
  propertyDetails: string;

  @ApiProperty({
    description: 'Additional notes for the quote.',
    example: 'Discounts available for first-time customers.',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalNotes?: string;

  @ApiProperty({
    description: 'An optional description of the quote.',
    example: 'Quote for services rendered.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
