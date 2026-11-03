import { isAxiosError } from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookForm } from "@/components/book-form";
import { getBook } from "@/services/books";
import type { Book } from "@/types/book";

export const metadata = { title: "Editar livro" };

type EditBookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;

  let book: Book;
  try {
    book = await getBook(id);
  } catch (error) {
    if (
      isAxiosError(error) &&
      [400, 404].includes(error.response?.status ?? 0)
    ) {
      notFound();
    }
    throw error;
  }

  return (
    <section className="space-y-6">
      <Link href="/books" className="text-sm text-muted-foreground underline">
        ← Voltar para a lista
      </Link>
      <h1 className="text-3xl font-bold">Editar livro</h1>
      <BookForm book={book} />
    </section>
  );
}
