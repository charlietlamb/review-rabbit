import { z } from 'zod'

export const subscription = z.object({
  plan: z.enum(['free', 'plus', 'pro']),
  status: z.enum(['active', 'inactive', 'trialing']),
  currency: z.enum(['usd', 'eur', 'gbp', 'cad', 'aud']),
  subscriptionId: z.string(),
  priceId: z.string(),
  customerId: z.string(),
  interval: z.enum(['month', 'year']),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  cancelAtPeriodEnd: z.boolean(),
  paymentMethod: z.object({
    brand: z.string(),
    last4: z.string(),
  }),
  stripeCustomerPortalUrl: z.string().optional(),
})

export type Subscription = z.infer<typeof subscription>
