import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const server = {
  // Database
  DATABASE_URL: z.string().min(1).url(),

  // Server Config
  LOG_LEVEL: z
    .enum(['debug', 'info', 'warn', 'error'])
    .optional()
    .default('debug'),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // AWS Configuration
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_S3_BUCKET_NAME: z.string().min(1),
  AWS_REGION: z.string().min(1),

  // Authentication
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_BASE_PATH: z.string().min(1).startsWith('/'),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),

  // Bundle Analyzer
  ANALYZE: z.string().optional().default('false'),
} as const

const client = {
  // Public URLs
  NEXT_PUBLIC_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_WEB: z.string().min(1).url(),
  NEXT_PUBLIC_API: z.string().min(1).url(),
  NEXT_PUBLIC_AWS_S3_URL: z.string().min(1).url(),
  NEXT_PUBLIC_AWS_CLOUDFRONT_URL: z.string().min(1).url(),

  // Stripe Public Keys
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
  NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID: z.string().min(1).startsWith('price_'),
  NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID: z.string().min(1).startsWith('price_'),
  NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID: z.string().min(1).startsWith('price_'),

  // PostHog
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
} as const

const dbOnlyEnv = createEnv({
  server: {
    DATABASE_URL: z.string().min(1).url(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
})

const databaseOnly = process.env.DATABASE_ONLY === 'true'

let mainEnv: ReturnType<typeof createEnv<typeof server, typeof client>>

if (!databaseOnly) {
  mainEnv = createEnv({
    server,
    client,
    runtimeEnv: {
      // Server
      DATABASE_URL: process.env.DATABASE_URL,

      LOG_LEVEL: process.env.LOG_LEVEL,
      NODE_ENV: process.env.NODE_ENV,

      // AWS
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
      AWS_REGION: process.env.AWS_REGION,

      // Auth
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      BETTER_AUTH_BASE_PATH: process.env.BETTER_AUTH_BASE_PATH,

      // Stripe
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

      // Bundle Analyzer
      ANALYZE: process.env.ANALYZE,

      // Client
      NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
      NEXT_PUBLIC_WEB: process.env.NEXT_PUBLIC_WEB,
      NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
      NEXT_PUBLIC_AWS_S3_URL: process.env.NEXT_PUBLIC_AWS_S3_URL,
      NEXT_PUBLIC_AWS_CLOUDFRONT_URL:
        process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID:
        process.env.NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID,
      NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID:
        process.env.NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID,
      NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID:
        process.env.NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID,
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    },
  })
}

type EnvType = ReturnType<typeof createEnv<typeof server, typeof client>>
// @ts-expect-error - This is a workaround to avoid type errors when using the env variable
export const env: EnvType = !databaseOnly ? mainEnv : dbOnlyEnv
