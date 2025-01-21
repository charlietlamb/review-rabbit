import { getDb } from '@rabbit/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { sendEmail, getVerifyEmail, getResetPasswordEmail } from '@rabbit/email'
import * as schema from '@rabbit/database/schema'
import { oneTap, openAPI } from 'better-auth/plugins'
import { EnvType } from '@rabbit/env'

let auth: ReturnType<typeof betterAuth> | null = null
export const authUser:
  | ReturnType<typeof betterAuth>['$Infer']['Session']['user']
  | null = null
export const authSession:
  | ReturnType<typeof betterAuth>['$Infer']['Session']['session']
  | null = null

export function getAuth(env: EnvType): ReturnType<typeof betterAuth> {
  if (!auth) {
    const db = getDb(env)
    auth = betterAuth({
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
            [user.email],
            'Reset your password',
            getResetPasswordEmail(user.name, url),
            env.RESEND_API_KEY
          )
        },
      },
      advanced: {
        disableCSRFCheck: true,
        cookiePrefix: 'review-rabbit',
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
          onboardingCompleted: {
            type: 'boolean',
            defaultValue: false,
            required: true,
            input: false,
          },
        },
      },
      emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
          await sendEmail(
            [user.email],
            'Verify your email address',
            getVerifyEmail(user.name, url, env),
            env.RESEND_API_KEY
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
          scopes: ['https://www.googleapis.com/auth/business.manage'],
        },
      },
    })
  }
  return auth!
}
