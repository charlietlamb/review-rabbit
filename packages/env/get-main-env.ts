import { server } from './server'
import { client } from './client'
import { createEnv } from '@t3-oss/env-nextjs'

export function getMainEnv() {
  return createEnv({
    server,
    client,
    runtimeEnv: {
      // Server
      DATABASE_URL: process.env.DATABASE_URL,

      LOG_LEVEL: process.env.LOG_LEVEL,
      NODE_ENV:
        process.env.NODE_ENV === 'undefined'
          ? 'development'
          : process.env.NODE_ENV,

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

      // Google OAuth
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

      // Trigger
      TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,

      // Upstash
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

      // Client
      NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
      NEXT_PUBLIC_WEB: process.env.NEXT_PUBLIC_WEB,
      NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
      NEXT_PUBLIC_AWS_S3_URL: process.env.NEXT_PUBLIC_AWS_S3_URL,
      NEXT_PUBLIC_AWS_CLOUDFRONT_URL:
        process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID:
        process.env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID,
      NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_TEST:
        process.env.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_TEST,
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

      // Resend
      RESEND_API_KEY: process.env.RESEND_API_KEY,

      // Twilio
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    },
  })
}
