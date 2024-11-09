import { db } from './src/db/postgres'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import env from './src/env'
import sendEmail from './src/actions/email/send-email'
import getVerifyEmail from './src/email/verify-email'
import resetPasswordEmail from './src/email/reset-password-email'

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
    sendResetPassword: async (user, url) => {
      await sendEmail(
        user.email,
        'Reset your password',
        resetPasswordEmail(user, url)
      )
    },
  },
  advanced: {
    disableCSRFCheck: true,
    cookiePrefix: 'remio',
  },
  user: {
    additionalFields: {
      imageUploaded: {
        type: 'boolean',
        required: true,
        default: false,
      },
      imageExpiresAt: {
        type: 'string',
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
  emailVerification: {
    sendVerificationEmail: async (user, url, token) => {
      await sendEmail(
        user.email,
        'Verify your email address',
        getVerifyEmail(user, url)
      )
    },
    sendOnSignUp: true,
  },
  trustedOrigins: ['http://localhost:3000'],
})
