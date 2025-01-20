import { env as processEnv } from 'node:process'
import { createEnv } from '@t3-oss/env-nextjs'
import { server, client } from '@rabbit/env'

export type Env = ReturnType<typeof createEnv<typeof server, typeof client>>

function validateEnvVar(
  key: keyof Env,
  value: unknown
): asserts value is string {
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
}

export function setupEnv(contextEnv: Env): void {
  // Validate all environment variables
  ;(Object.keys(contextEnv) as Array<keyof Env>).forEach((key) => {
    validateEnvVar(key, contextEnv[key])
  })

  // Server Environment Variables
  processEnv.DATABASE_URL = contextEnv.DATABASE_URL
  processEnv.NODE_ENV = contextEnv.NODE_ENV
  processEnv.LOG_LEVEL = contextEnv.LOG_LEVEL

  // AWS Configuration
  processEnv.AWS_ACCESS_KEY_ID = contextEnv.AWS_ACCESS_KEY_ID
  processEnv.AWS_SECRET_ACCESS_KEY = contextEnv.AWS_SECRET_ACCESS_KEY
  processEnv.AWS_REGION = contextEnv.AWS_REGION
  processEnv.AWS_S3_BUCKET_NAME = contextEnv.AWS_S3_BUCKET_NAME

  // Authentication
  processEnv.BETTER_AUTH_SECRET = contextEnv.BETTER_AUTH_SECRET
  processEnv.BETTER_AUTH_BASE_PATH = contextEnv.BETTER_AUTH_BASE_PATH

  // Stripe Configuration
  processEnv.STRIPE_SECRET_KEY = contextEnv.STRIPE_SECRET_KEY
  processEnv.STRIPE_WEBHOOK_SECRET = contextEnv.STRIPE_WEBHOOK_SECRET

  // Google OAuth
  processEnv.GOOGLE_CLIENT_SECRET = contextEnv.GOOGLE_CLIENT_SECRET

  // Trigger
  processEnv.TRIGGER_SECRET_KEY = contextEnv.TRIGGER_SECRET_KEY

  // Upstash
  processEnv.UPSTASH_REDIS_REST_URL = contextEnv.UPSTASH_REDIS_REST_URL
  processEnv.UPSTASH_REDIS_REST_TOKEN = contextEnv.UPSTASH_REDIS_REST_TOKEN

  // Email
  processEnv.RESEND_API_KEY = contextEnv.RESEND_API_KEY

  // Twilio
  processEnv.TWILIO_ACCOUNT_SID = contextEnv.TWILIO_ACCOUNT_SID
  processEnv.TWILIO_AUTH_TOKEN = contextEnv.TWILIO_AUTH_TOKEN

  // Bundle Analyzer
  processEnv.ANALYZE = contextEnv.ANALYZE

  // Client Environment Variables
  processEnv.NEXT_PUBLIC_DOMAIN = contextEnv.NEXT_PUBLIC_DOMAIN
  processEnv.NEXT_PUBLIC_WEB = contextEnv.NEXT_PUBLIC_WEB
  processEnv.NEXT_PUBLIC_API = contextEnv.NEXT_PUBLIC_API
  processEnv.NEXT_PUBLIC_AWS_S3_URL = contextEnv.NEXT_PUBLIC_AWS_S3_URL
  processEnv.NEXT_PUBLIC_AWS_CLOUDFRONT_URL =
    contextEnv.NEXT_PUBLIC_AWS_CLOUDFRONT_URL

  // Stripe Public Keys
  processEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
    contextEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  processEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID =
    contextEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID
  processEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_YEARLY =
    contextEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_YEARLY
  processEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO =
    contextEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO
  processEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO_YEARLY =
    contextEnv.NEXT_PUBLIC_STRIPE_PLAN_PRICE_ID_PRO_YEARLY

  // PostHog
  processEnv.NEXT_PUBLIC_POSTHOG_KEY = contextEnv.NEXT_PUBLIC_POSTHOG_KEY
  processEnv.NEXT_PUBLIC_POSTHOG_HOST = contextEnv.NEXT_PUBLIC_POSTHOG_HOST

  // Google OAuth Client
  processEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID =
    contextEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID
}
