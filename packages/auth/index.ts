import { db } from '@remio/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '@remio/env'
import { sendEmail, getVerifyEmail, getResetPasswordEmail } from '@remio/email'
import * as schema from '@remio/database/schema'
import { oneTap, openAPI } from 'better-auth/plugins'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  baseURL: env.NEXT_PUBLIC_API,
  basePath: env.BETTER_AUTH_BASE_PATH,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }, request) => {
      await sendEmail(
        user.email,
        'Reset your password',
        getResetPasswordEmail(user.name, url)
      )
    },
  },
  advanced: {
    disableCSRFCheck: true,
    cookiePrefix: 'remio',
    generateId: () => crypto.randomUUID(),
    crossSubDomainCookies: {
      enabled: env.NODE_ENV === 'production' ? true : false,
      domain: env.NEXT_PUBLIC_DOMAIN,
    },
  },
  user: {
    additionalFields: {
      imageUploaded: {
        type: 'boolean',
        required: true,
        defaultValue: false,
        input: false,
      },
      imageExpiresAt: {
        type: 'string',
        defaultValue: null,
        required: false,
        input: false,
      },
      plan: {
        type: 'string',
        defaultValue: 'free',
        required: true,
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail(
        user.email,
        'Verify your email address',
        getVerifyEmail(user.name, url)
      )
    },
    sendOnSignUp: false,
  },
  trustedOrigins: [env.NEXT_PUBLIC_WEB],
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [openAPI(), oneTap()],
  socialProviders: {
    google: {
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_API}/api/auth/callback/google`,
    },
  },
})
