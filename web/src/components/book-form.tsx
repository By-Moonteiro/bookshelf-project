"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookFormSchema, type BookFormValues } from "@/schemas/book";
import { createBook } from "@/services/books";
import { BOOK_STATUSES, BOOK_STATUS_LABELS } from "@/types/book";

export function BookForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      status: "WANT_TO_READ",
      rating: null,
    },
  });

  async function onSubmit(values: BookFormValues) {
    try {
      await createBook(values);
      router.push("/books");
      router.refresh();
    } catch {
      setError("root", {
        message: "Não foi possível salvar o livro. Tente novamente.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          {...register("title")}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? "author-error" : undefined}
          {...register("author")}
        />
        {errors.author && (
          <p id="author-error" className="text-sm text-destructive">
            {errors.author.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          {...register("status")}
        >
          {BOOK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {BOOK_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Nota (opcional, de 1 a 5)</Label>
        <Input
          id="rating"
          type="number"
          aria-invalid={!!errors.rating}
          aria-describedby={errors.rating ? "rating-error" : undefined}
          {...register("rating", {
            setValueAs: (value) =>
              value === "" || value == null ? null : Number(value),
          })}
        />
        {errors.rating && (
          <p id="rating-error" className="text-sm text-destructive">
            {errors.rating.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p role="alert" className="text-sm text-destructive">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar livro"}
      </Button>
    </form>
  );
}
