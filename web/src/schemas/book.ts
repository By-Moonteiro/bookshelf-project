import { z } from "zod";
import { BOOK_STATUSES } from "@/types/book";

export const bookFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Informe o título")
    .max(150, "Máximo de 150 caracteres"),
  author: z
    .string()
    .trim()
    .min(1, "Informe o autor")
    .max(100, "Máximo de 100 caracteres"),
  status: z.enum(BOOK_STATUSES),
  rating: z
    .number()
    .int("Use um número inteiro")
    .min(1, "A nota mínima é 1")
    .max(5, "A nota máxima é 5")
    .nullable(),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;
