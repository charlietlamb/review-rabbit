import { getEnv } from '@rabbit/env'
import { Plan } from '@rabbit/hono/lib/types'

export type PricingTier = {
  title: string
  price: number | null
  description: string
  buttonText: string
  priceId?: string
  plan: Plan
  highlighted?: boolean
}

export type PlanAvailability = {
  free: boolean
  basic: boolean
  pro: boolean
}

export type FeatureAvailability = {
  [key: string]: PlanAvailability
}

const env = getEnv()

// Features are ordered by availability (most widely available first)
export const features: FeatureAvailability = {
  // Available in all plans
  Analytics: {
    free: true,
    basic: true,
    pro: true,
  },
  'Email Support': {
    free: true,
    basic: true,
    pro: true,
  },
  Automations: {
    free: true,
    basic: true,
    pro: true,
  },
  // Available in Plus and Pro
  'Priority Support': {
    free: false,
    basic: true,
    pro: true,
  },
  'Advanced Automations': {
    free: false,
    basic: true,
    pro: true,
  },
  'API Access': {
    free: false,
    basic: true,
    pro: true,
  },
  // Pro only features
  'Unlimited API Access': {
    free: false,
    basic: false,
    pro: true,
  },
  'Custom Integrations': {
    free: false,
    basic: false,
    pro: true,
  },
  'Team Collaboration': {
    free: false,
    basic: false,
    pro: true,
  },
}

export const getPricingTiers = (isDevelopment: boolean): PricingTier[] => {
  return [
    {
      title: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      buttonText: 'Get Started',
      plan: 'free',
    },
    {
      title: 'Plus',
      price: 30,
      description: 'Essential features for small projects',
      buttonText: 'Upgrade to Plus',
      priceId: isDevelopment
        ? env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_TEST
        : env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID,
      plan: 'basic',
      highlighted: true,
    },
    {
      title: 'Pro',
      price: 90,
      description: 'Advanced features for growing teams',
      buttonText: 'Upgrade to Pro',
      priceId: isDevelopment
        ? env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO_TEST
        : env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO,
      plan: 'pro',
    },
  ]
}
