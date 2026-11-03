import { z } from 'zod';
import { BOOK_STATUSES } from '../entities/book.entity.js';

export const createBookSchema = z.object({
  title: z.string().trim().min(1).max(150),
  author: z.string().trim().min(1).max(100),
  status: z.enum(BOOK_STATUSES),
  rating: z.number().int().min(1).max(5).nullable().optional(),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
