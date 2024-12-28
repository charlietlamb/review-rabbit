import { z } from 'zod'
import { priceFormSchema } from './prices'

export const productFormSchema = z.object({
  title: z.string().min(1),
  prices: z.array(priceFormSchema),
})

export type ProductFormSchema = z.infer<typeof productFormSchema>

export const createProductFormSchema = productFormSchema.extend({
  stripeConnectId: z.string().min(1),
})

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
