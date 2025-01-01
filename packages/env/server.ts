import { z } from 'zod'

export const server = {
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
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_live_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),
  STRIPE_CLIENT_ID: z.string().min(1),

  // Bundle Analyzer
  ANALYZE: z.string().optional().default('false'),

  // Google OAuth
  GOOGLE_CLIENT_SECRET: z.string().min(1),

  // Resend
  RESEND_API_KEY: z.string().min(1),

  // Twilio
  TWILIO_ACCOUNT_SID: z.string().min(1),
  TWILIO_AUTH_TOKEN: z.string().min(1),
} as const

export const dbOnlyServer = { DATABASE_URL: z.string().min(1).url() }
