import { env } from '@rabbit/env'
import { Plan } from '@rabbit/hono/lib/types'

export type PricingTier = {
  title: string
  monthlyPrice: number | null
  yearlyPrice: number | null
  description: string
  buttonText: string
  monthlyPriceId?: string
  yearlyPriceId?: string
  plan: Plan
  highlighted?: boolean
}

export type PlanAvailability = {
  free: boolean
  plus: boolean
  pro: boolean
}

export type FeatureAvailability = {
  [key: string]: PlanAvailability
}

// Features are ordered by availability (most widely available first)
export const features: FeatureAvailability = {
  // Available in all plans
  'Onboarding Support': {
    free: true,
    plus: true,
    pro: true,
  },
  Analytics: {
    free: true,
    plus: true,
    pro: true,
  },
  'Email Automations': {
    free: true,
    plus: true,
    pro: true,
  },
  // Available in Plus and Pro
  'SMS Automations': {
    free: false,
    plus: true,
    pro: true,
  },
  'WhatsApp Automations': {
    free: false,
    plus: true,
    pro: true,
  },
  'Continuous Review Updates From Google': {
    free: false,
    plus: true,
    pro: true,
  },
  // Pro only features
  'Multiple Locations': {
    free: false,
    plus: false,
    pro: true,
  },
  'Priority Support': {
    free: false,
    plus: false,
    pro: true,
  },
}

export const pricingTiers = [
  {
    title: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'All you need to get to know the platform.',
    buttonText: 'Get Started',
    plan: 'free',
  },
  {
    title: 'Plus',
    monthlyPrice: 30,
    yearlyPrice: 300,
    description: 'Essential features for small to medium size businesses.',
    buttonText: 'Upgrade to Plus',
    monthlyPriceId: env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID,
    yearlyPriceId: env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_YEARLY,
    plan: 'plus',
    highlighted: true,
  },
  {
    title: 'Pro',
    monthlyPrice: 90,
    yearlyPrice: 900,
    description: 'Perfect for agencies or large businesses.',
    buttonText: 'Upgrade to Pro',
    monthlyPriceId: env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO,
    yearlyPriceId: env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO_YEARLY,
    plan: 'pro',
  },
] as PricingTier[]
