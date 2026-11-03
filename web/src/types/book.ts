export type BookStatus = "WANT_TO_READ" | "READING" | "READ";

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
