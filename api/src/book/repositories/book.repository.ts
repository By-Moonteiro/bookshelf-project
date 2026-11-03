import type {
  Book,
  CreateBookData,
  ListBooksFilter,
  UpdateBookData,
} from '../entities/book.entity.js';

export abstract class BookRepository {
  abstract findAll(filter?: ListBooksFilter): Promise<Book[]>;
  abstract findById(id: string): Promise<Book | null>;
  abstract create(data: CreateBookData): Promise<Book>;
  abstract update(id: string, data: UpdateBookData): Promise<Book | null>;
  abstract delete(id: string): Promise<Book | null>;
}
