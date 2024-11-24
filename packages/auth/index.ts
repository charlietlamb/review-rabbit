import { db } from '@dubble/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '@dubble/env'
import { sendEmail, getVerifyEmail, getResetPasswordEmail } from '@dubble/email'
import * as schema from '@dubble/database/schema'
import { oneTap, openAPI } from 'better-auth/plugins'

// base url is in the form of https://dubble.sbs
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  baseURL: env.NEXT_PUBLIC_WEB,
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
    cookiePrefix: 'dubble',
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
    sendOnSignUp: true,
  },
  trustedOrigins: [env.NEXT_PUBLIC_WEB],
  plugins: [openAPI(), oneTap()],
  socialProviders: {
    google: {
      clientId:
        '1063999285216-pkh72jia8l352ivn7q9ojpqrp1dvuv9m.apps.googleusercontent.com',
      clientSecret: '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',
      redirectURI: `${env.NEXT_PUBLIC_WEB}/dashboard/connect`,
    },
  },
})
