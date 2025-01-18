import { z } from 'zod'
export const stripeSubscription = z.object({
  subscriptionId: z.string(),
  status: z.enum(['active', 'inactive', 'trialing']),
  priceId: z.string(),
  currency: z.enum(['usd', 'eur', 'gbp', 'cad', 'aud']),
  currentPeriodEnd: z.date(),
  currentPeriodStart: z.date(),
  cancelAtPeriodEnd: z.boolean(),
  paymentMethod: z.object({
    brand: z.string(),
    last4: z.string(),
  }),
})

export type StripeSubscription = z.infer<typeof stripeSubscription>
