import * as z from 'zod';

export const productSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  category: z.string().min(2, 'La categoría es obligatoria'),
  image: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
});

export type ProductInput = z.infer<typeof productSchema>;
export type Product = ProductInput & { id: string | number };
