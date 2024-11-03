import env from '@/env'

export type PricingTier = {
  title: string
  price: number
  description: string
  features: string[]
  buttonText: string
  priceId: string
}

export const pricingTiers: PricingTier[] = [
  {
    title: 'Basic',
    price: 9,
    description: 'Essential features for small projects',
    features: ['1 user', '5 projects', '5GB storage', 'Basic support'],
    buttonText: 'Get Started',
    priceId: env.NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID,
  },
  {
    title: 'Pro',
    price: 29,
    description: 'Advanced features for growing teams',
    features: [
      '5 users',
      '20 projects',
      '50GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
    ],
    buttonText: 'Upgrade to Pro',
    priceId: env.NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID,
  },
  {
    title: 'Enterprise',
    price: 99,
    description: 'Full suite for large organizations',
    features: [
      'Unlimited users',
      'Unlimited projects',
      '1TB storage',
      '24/7 dedicated support',
      'Advanced security',
      'Custom integrations',
      'SLA guarantee',
    ],
    buttonText: 'Contact Sales',
    priceId: env.NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID,
  },
]
