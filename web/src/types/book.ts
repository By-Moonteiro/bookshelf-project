export const BOOK_STATUSES = ["WANT_TO_READ", "READING", "READ"] as const;
export type BookStatus = (typeof BOOK_STATUSES)[number];

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  WANT_TO_READ: "Quero ler",
  READING: "Lendo",
  READ: "Lido",
};

export type Book = {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
};

export type BookInput = {
  title: string;
  author: string;
  status: BookStatus;
  rating?: number | null;
};
