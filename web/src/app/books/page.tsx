import Link from "next/link";
import { z } from "zod";
import { BookCard } from "@/components/book-card";
import { BookStatusFilter } from "@/components/book-status-filter";
import { buttonVariants } from "@/components/ui/button";
import { getBooks } from "@/services/books";
import { BOOK_STATUSES } from "@/types/book";

type BooksPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { status } = await searchParams;

  const parsed = z.enum(BOOK_STATUSES).safeParse(status);
  const currentStatus = parsed.success ? parsed.data : undefined;

  const books = await getBooks(currentStatus);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus livros</h1>
        <Link href="/books/new" className={buttonVariants()}>
          Adicionar livro
        </Link>
      </div>

      <BookStatusFilter current={currentStatus} />

      {books.length === 0 ? (
        <p className="text-muted-foreground">Nenhum livro por aqui ainda.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
