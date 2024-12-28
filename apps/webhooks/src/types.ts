interface Env {
  DATABASE_URL: string
  NODE_ENV: 'development' | 'production'
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
}
