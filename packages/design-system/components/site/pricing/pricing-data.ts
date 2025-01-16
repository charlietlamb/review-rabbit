import { getEnv } from '@rabbit/env'
import { Plan } from '@rabbit/hono/lib/types'

export type PricingTier = {
  title: string
  price: number | null
  description: string
  features: string[]
  buttonText: string
  priceId?: string
  plan: Plan
  highlighted?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    title: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: ['Basic Analytics', 'Email Support', 'Limited Automations'],
    buttonText: 'Get Started',
    plan: 'free',
  },
  {
    title: 'Basic',
    price: 30,
    description: 'Essential features for small projects',
    features: [
      'Advanced Analytics',
      'Priority Email Support',
      'Full Automations',
      'API Access',
    ],
    buttonText: 'Upgrade to Basic',
    priceId: getEnv().NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID,
    plan: 'basic',
    highlighted: true,
  },
  {
    title: 'Pro',
    price: 50,
    description: 'Advanced features for growing teams',
    features: [
      'Enterprise Analytics',
      'Priority Support',
      'Advanced Automations',
      'Unlimited API Access',
      'Custom Integrations',
      'Team Collaboration',
    ],
    buttonText: 'Upgrade to Pro',
    priceId: getEnv().NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO,
    plan: 'pro',
  },
]
