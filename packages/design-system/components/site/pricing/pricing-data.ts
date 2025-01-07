import { getEnv } from '@rabbit/env'
import { Plan } from '@rabbit/hono/lib/types'

export type PricingTier = {
  title: string
  price: number
  description: string
  features: string[]
  buttonText: string
  priceId: string
  plan: Plan
}

export const pricingTiers: PricingTier[] = [
  {
    title: 'Basic',
    price: 30,
    description: 'Essential features for small projects',
    features: ['Analytic Reports', 'Email', 'Schedule Automations'],
    buttonText: 'Get Started',
    priceId: getEnv().NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID,
    plan: 'basic',
  },
  {
    title: 'Pro',
    price: 50,
    description: 'Advanced features for automations',
    features: [
      'Analytic Reports',
      'Email',
      'Note Editor',
      'Schedule Automations',
      'Calendar Integrations',
      'Stripe Payments',
    ],
    buttonText: 'Upgrade to Pro',
    priceId: getEnv().NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID,
    plan: 'pro',
  },
  {
    title: 'Enterprise',
    price: 99,
    description: 'Contact Sales for Custom Features',
    features: ['Custom Features'],
    buttonText: 'Contact Sales',
    priceId: getEnv().NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID,
    plan: 'enterprise',
  },
]
