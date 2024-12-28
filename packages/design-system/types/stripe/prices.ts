import { z } from 'zod'

export const priceFormSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  price: z.number().min(0),
  currency: z.string(),
})

export type PriceFormSchema = z.infer<typeof priceFormSchema>
