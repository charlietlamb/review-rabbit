import { dbOnlyServer } from './server'
import { dbOnlyClient } from './client'
import { createEnv } from '@t3-oss/env-nextjs'

export const dbEnv = createEnv({
  server: dbOnlyServer,
  client: dbOnlyClient,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
})
