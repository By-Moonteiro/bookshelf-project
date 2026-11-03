import { z } from 'zod';
import { BOOK_STATUSES } from '../entities/book.entity.js';

export const listBooksQuerySchema = z.object({
  status: z.enum(BOOK_STATUSES).optional(),
});

export type ListBooksQueryDto = z.infer<typeof listBooksQuerySchema>;
