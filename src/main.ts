/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './response.interceptor';
import { CustomExceptionFilter } from './custom-error.interceptor';
//import * as cors from 'cors';
// import { JwtAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix to /mesh/api
  app.setGlobalPrefix('mesh/api');

 /* app.enableCors({
    origin: process.env.CURL_URL||'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type, Accept, X-Requested-With',
    credentials: true,
    
  });*/
  

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw errors for unknown properties
      transform: true, // Automatically transform payloads to match DTO classes
    }),
  );

    // Use cors middleware
    /*app.use(cors({
      origin: ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));*/

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:3000","http://localhost:3001"];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization,Accept ,X-Requested-With',
      credentials: true,
      preflightContinue: false,
      exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
    });

  // // Apply the JWT Guard globally
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Apply the global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Driveway Service API') // Set the title of your API documentation
    .setDescription('API documentation for the Driveway Service') // Description
    .setVersion('1.1') // Version of your API
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    ) // Adds the Bearer token authorization option
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps the token after refresh
    },
  }); // Swagger UI will be available at '/api'

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
