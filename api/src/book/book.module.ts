import { Module } from '@nestjs/common';
import { BooksService } from './book.service.js';
import { BooksController } from './book.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { BookRepository } from './repositories/book.repository.js';
import { PrismaBookRepository } from './repositories/prisma-book.repository.js';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BookRepository,
      useClass: PrismaBookRepository,
    },
  ],
})
export class BookModule {}
