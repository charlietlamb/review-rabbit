import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
    AWS_REGION: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_BASE_PATH: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_LOCATION: z.string().url(),
    NEXT_PUBLIC_AWS_S3_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID: z.string(),
    NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID: z.string(),
    NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_LOCATION: process.env.NEXT_PUBLIC_LOCATION,
    NEXT_PUBLIC_AWS_S3_URL: process.env.NEXT_PUBLIC_AWS_S3_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID,
    NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID,
    NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID,
  },
})

export default env
