import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  Book,
  CreateBookData,
  ListBooksFilter,
  UpdateBookData,
} from './entities/book.entity.js';
import { BookRepository } from './repositories/book.repository.js';

@Injectable()
export class BooksService {
  constructor(private readonly books: BookRepository) {}

  findAll(filter?: ListBooksFilter): Promise<Book[]> {
    return this.books.findAll(filter);
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.books.findById(id);
    if (!book) throw this.notFound(id);
    return book;
  }

  create(data: CreateBookData): Promise<Book> {
    return this.books.create(data);
  }

  async update(id: string, data: UpdateBookData): Promise<Book> {
    const book = await this.books.update(id, data);
    if (!book) throw this.notFound(id);
    return book;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.books.delete(id);
    if (!deleted) throw this.notFound(id);
  }

  private notFound(id: string) {
    return new NotFoundException(`Book ${id} not found`);
  }
}
