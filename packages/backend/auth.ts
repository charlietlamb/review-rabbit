import { db } from './src/db/postgres'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import env from './src/env'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    generateId: () => crypto.randomUUID(),
  }),
  baseURL: env.BETTER_AUTH_URL,
  basePath: env.BETTER_AUTH_BASE_PATH,
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domains: ['localhost'],
    },
    disableCSRFCheck: true,
  },
  user: {
    additionalFields: {
      imageUploaded: {
        type: 'boolean',
        required: true,
        default: false,
      },
      imageExpiresAt: {
        type: 'date',
        default: null,
        required: false,
      },
      plan: {
        type: 'string',
        default: 'free',
        required: true,
      },
    },
  },
})
