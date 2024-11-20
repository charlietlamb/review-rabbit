import { db } from '@dubble/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '@dubble/env'
import { sendEmail, getVerifyEmail, getResetPasswordEmail } from '@dubble/email'

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
    sendResetPassword: async (user, url: string) => {
      await sendEmail(
        user.email,
        'Reset your password',
        getResetPasswordEmail(user.name, url)
      )
    },
  },
  advanced: {
    disableCSRFCheck: true,
    cookiePrefix: 'dubble',
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
        getVerifyEmail(user.name, url)
      )
    },
    sendOnSignUp: true,
  },
  trustedOrigins: ['http://localhost:3000'],
})
