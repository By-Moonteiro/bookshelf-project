import { api } from "@/lib/api";
import type { Book, BookInput, BookStatus } from "@/types/book";

export async function getBooks(status?: BookStatus): Promise<Book[]> {
  const { data } = await api.get<Book[]>("/books", { params: { status } });
  return data;
}

export async function getBook(id: string): Promise<Book> {
  const { data } = await api.get<Book>(`/books/${id}`);
  return data;
}

export async function createBook(input: BookInput): Promise<Book> {
  const { data } = await api.post<Book>("/books", input);
  return data;
}

export async function updateBook(
  id: string,
  input: Partial<BookInput>,
): Promise<Book> {
  const { data } = await api.patch<Book>(`/books/${id}`, input);
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/books/${id}`);
}
