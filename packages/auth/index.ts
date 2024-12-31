import { db } from '@rabbit/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getEnv } from '@rabbit/env'
import { sendEmail, getVerifyEmail, getResetPasswordEmail } from '@rabbit/email'
import * as schema from '@rabbit/database/schema'
import { oneTap, openAPI } from 'better-auth/plugins'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  baseURL: getEnv().NEXT_PUBLIC_API,
  basePath: getEnv().BETTER_AUTH_BASE_PATH,
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
    cookiePrefix: 'review-rabbit',
    generateId: () => crypto.randomUUID(),
    crossSubDomainCookies: {
      enabled: getEnv().NODE_ENV === 'production' ? true : false,
      domain: getEnv().NEXT_PUBLIC_DOMAIN,
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
      onboardingCompleted: {
        type: 'boolean',
        defaultValue: false,
        required: true,
        input: false,
      },
      currency: {
        type: 'string',
        defaultValue: 'usd',
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
  trustedOrigins: [getEnv().NEXT_PUBLIC_WEB],
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [openAPI(), oneTap()],
  socialProviders: {
    google: {
      clientId: getEnv().NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: getEnv().GOOGLE_CLIENT_SECRET,
      redirectURI: `${getEnv().NEXT_PUBLIC_API}/api/auth/callback/google`,
    },
  },
})
