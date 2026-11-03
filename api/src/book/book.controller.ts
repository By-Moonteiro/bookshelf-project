import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './book.service.js';
import { idSchema } from '../common/schemas/id.schema.js';
import {
  createBookSchema,
  type CreateBookDto,
} from './dtos/create-book.dto.js';
import {
  listBooksQuerySchema,
  type ListBooksQueryDto,
} from './dtos/list-books-query.dto.js';
import {
  updateBookSchema,
  type UpdateBookDto,
} from './dtos/update-book.dto.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(
    @Query({ schema: listBooksQuerySchema })
    query: ListBooksQueryDto,
  ) {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', { schema: idSchema }) id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body({ schema: createBookSchema }) body: CreateBookDto) {
    return this.booksService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', { schema: idSchema }) id: string,
    @Body({ schema: updateBookSchema }) body: UpdateBookDto,
  ) {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', { schema: idSchema }) id: string) {
    return this.booksService.remove(id);
  }
}
