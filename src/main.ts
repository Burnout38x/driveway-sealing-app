/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix to /mesh/api
  app.setGlobalPrefix('mesh/api');

  app.enableCors({
    origin: 'https://nest-mesh.onrender.com/api',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type',
  });
  

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw errors for unknown properties
      transform: true, // Automatically transform payloads to match DTO classes
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Driveway Service API')  // Set the title of your API documentation
    .setDescription('API documentation for the Driveway Service')  // Description
    .setVersion('1.0')  // Version of your API
    .addBearerAuth() // Adds the Bearer token authorization option
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document);  // Swagger UI will be available at '/api'

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
