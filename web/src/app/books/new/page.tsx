import Link from "next/link";
import { BookForm } from "@/components/book-form";

export const metadata = { title: "Novo livro" };

export default function NewBookPage() {
  return (
    <section className="space-y-6">
      <Link href="/books" className="text-sm text-muted-foreground underline">
        ← Voltar para a lista
      </Link>
      <h1 className="text-3xl font-bold">Adicionar livro</h1>
      <BookForm />
    </section>
  );
}
