import { PrismaModule } from './prisma/prisma.module.js';
import { CommonModule } from './common/common.module.js';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { envSchema } from './config/env.schema.js';
import { BookModule } from './book/book.module.js';

@Module({
  imports: [PrismaModule, CommonModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }), BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
