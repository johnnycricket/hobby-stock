import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  minQuantity: z.string().optional(),
  unitPrice: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  notes: z.string().optional(),
});
