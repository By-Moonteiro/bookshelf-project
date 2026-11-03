import { z } from 'zod';
import { createBookSchema } from './create-book.dto.js';

export const updateBookSchema = createBookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateBookDto = z.infer<typeof updateBookSchema>;
