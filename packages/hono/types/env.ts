import { Context } from 'hono'

export interface Env {
  DATABASE_URL: string
  NODE_ENV: 'development' | 'production' | 'test'
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
}

export type ContextWithEnv = Context & {
  env: Env
}
