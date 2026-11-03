import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BOOK_STATUS_LABELS, type Book } from "@/types/book";

export function BookCard({ book }: { book: Book }) {
  return (
    <article>
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold">{book.title}</h2>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Badge variant="secondary">{BOOK_STATUS_LABELS[book.status]}</Badge>
          {book.rating !== null && (
            <p aria-label={`Nota ${book.rating} de 5`}>★ {book.rating}/5</p>
          )}
        </CardContent>
        <CardFooter className="gap-2">
          <Link
            href={`/books/${book.id}/edit`}
            aria-label={`Editar ${book.title}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Editar
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
}
