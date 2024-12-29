import { defineConfig } from 'drizzle-kit'
import { getEnv } from '@burse/env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './schema/*',
  out: './migrations',
  dbCredentials: {
    url: getEnv().DATABASE_URL ?? 'invalid-db-url',
  },
})
