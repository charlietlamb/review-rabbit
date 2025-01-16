import { z } from 'zod'

export const client = {
  // Public URLs
  NEXT_PUBLIC_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_WEB: z.string().min(1).url(),
  NEXT_PUBLIC_API: z.string().min(1).url(),
  NEXT_PUBLIC_AWS_S3_URL: z.string().min(1).url(),
  NEXT_PUBLIC_AWS_CLOUDFRONT_URL: z.string().min(1).url(),

  // Stripe Public Keys
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
  NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID: z.string().min(1).startsWith('price_'),
  NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_TEST: z.string().min(1).startsWith('price_'),

  // PostHog
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),

  // Google OAuth
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
} as const

export const dbOnlyClient = {}
