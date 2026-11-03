import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  Book,
  CreateBookData,
  ListBooksFilter,
  UpdateBookData,
} from '../entities/book.entity.js';
import { BookRepository } from './book.repository.js';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: ListBooksFilter = {}): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: { status: filter.status },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({ where: { id } });
  }

  async create(data: CreateBookData): Promise<Book> {
    return await this.prisma.book.create({ data });
  }

  async update(id: string, data: UpdateBookData): Promise<Book | null> {
    return await this.prisma.book.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Book | null> {
    return await this.prisma.book.delete({ where: { id } });
  }
}
