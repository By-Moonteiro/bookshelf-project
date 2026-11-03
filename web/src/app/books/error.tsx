"use client";

import { Button } from "@/components/ui/button";

export default function BooksError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section role="alert" className="space-y-4">
      <h1 className="text-2xl font-bold">
        Não foi possível carregar os livros
      </h1>
      <p className="text-muted-foreground">
        Verifique se a API está rodando e tente de novo.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </section>
  );
}
