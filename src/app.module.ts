/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { DatabaseModule } from './database/databse.module';
import { OrdersModule } from './orders/orders.module';
import { QuotesModule } from './quote/quotes.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule, // Add the DatabaseModule here
    AuthModule,
    QuotesModule,
    OrdersModule,
    BillsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
