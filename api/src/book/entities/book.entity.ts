export const BOOK_STATUSES = ['WANT_TO_READ', 'READING', 'READ'] as const;
export type BookStatus = (typeof BOOK_STATUSES)[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBookData = {
  title: string;
  author: string;
  status: BookStatus;
  rating?: number | null;
};

export type UpdateBookData = Partial<CreateBookData>;

export type ListBooksFilter = {
  status?: BookStatus;
};
