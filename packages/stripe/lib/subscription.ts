import { z } from 'zod'

export const subscription = z.object({
  plan: z.enum(['free', 'plus', 'pro']),
  status: z.enum(['active', 'inactive', 'trialing']),
  subscriptionId: z.string(),
  priceId: z.string(),
  interval: z.enum(['month', 'year']),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  cancelAtPeriodEnd: z.boolean(),
  paymentMethod: z.object({
    brand: z.string(),
    last4: z.string(),
  }),
})

export type Subscription = z.infer<typeof subscription>
