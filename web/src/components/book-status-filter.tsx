import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  BOOK_STATUSES,
  BOOK_STATUS_LABELS,
  type BookStatus,
} from "@/types/book";

type BookStatusFilterProps = { current?: BookStatus };

export function BookStatusFilter({ current }: BookStatusFilterProps) {
  const options = [
    { label: "Todos", href: "/books", active: !current },
    ...BOOK_STATUSES.map((status) => ({
      label: BOOK_STATUS_LABELS[status],
      href: `/books?status=${status}`,
      active: current === status,
    })),
  ];

  return (
    <nav aria-label="Filtrar livros por status">
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.href}>
            <Link
              href={option.href}
              aria-current={option.active ? "page" : undefined}
              className={buttonVariants({
                variant: option.active ? "default" : "outline",
                size: "sm",
              })}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
