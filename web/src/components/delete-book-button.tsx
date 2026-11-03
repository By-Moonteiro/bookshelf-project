"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBook } from "@/services/books";
import type { Book } from "@/types/book";

export function DeleteBookButton({ book }: { book: Book }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setError(null);
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteBook(book.id);
      setOpen(false);
      router.refresh();
    } catch {
      setError("Não foi possível excluir o livro. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        aria-label={`Excluir ${book.title}`}
        onClick={() => setOpen(true)}
      >
        Excluir
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir livro?</DialogTitle>
            <DialogDescription>
              &apos;{book.title}&apos; será removido da sua estante. Essa ação
              não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
