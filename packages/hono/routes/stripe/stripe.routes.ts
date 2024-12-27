import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@burse/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@burse/hono/lib/configure-auth'
import { selectStripeConnectSchema } from '@burse/database'

const tags = ['Stripe']

export const connect = createRoute({
  path: '/stripe/connect',
  method: 'get',
  summary: 'Connect to Stripe',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        redirectUrl: z.string(),
      }),
      'Stripe OAuth redirect URL.'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account already connected'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create Stripe Connect OAuth URL'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectRoute = typeof connect

export const connectRefresh = createRoute({
  path: '/stripe/connect/refresh/:accountId',
  method: 'get',
  summary: 'Refresh Stripe Connect OAuth token',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Token refreshed successfully'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Account ID is required or no refresh token found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to refresh OAuth token'
    ),
  },
})

export type ConnectRefreshRoute = typeof connectRefresh

export const connectReturn = createRoute({
  path: '/stripe/connect/oauth/callback',
  method: 'get',
  summary: 'Handle Stripe Connect OAuth callback',
  tags,
  request: {
    query: z.object({
      code: z.string(),
      state: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to dashboard',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid OAuth callback'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to complete OAuth flow'
    ),
  },
})

export type ConnectReturnRoute = typeof connectReturn

export const connectGet = createRoute({
  path: '/stripe/connect/get',
  method: 'get',
  summary: 'Get Stripe Connect account',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        account: selectStripeConnectSchema.optional(),
      }),
      'Stripe connected.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to get Stripe Connect account'
    ),
    ...unauthorizedSchema,
  },
})

export type ConnectGetRoute = typeof connectGet

export const paymentSuccess = createRoute({
  path: '/stripe/payment-success/:invoiceId',
  method: 'get',
  summary: 'Handle Stripe payment webhook and success redirect',
  tags: ['Stripe'],
  request: {
    headers: z.object({
      'stripe-signature': z
        .string()
        .optional()
        .describe('Stripe webhook signature'),
    }),
    query: z.object({
      session_id: z.string().optional(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.boolean(),
      'Payment processed successfully.'
    ),
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to invoice page',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid request'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to process payment'
    ),
  },
})

export type PaymentSuccessRoute = typeof paymentSuccess

export const subscriptionSuccess = createRoute({
  path: '/stripe/subscription-success',
  method: 'get',
  summary: 'Handle Stripe subscription success',
  tags: ['Stripe'],
  request: {
    query: z.object({
      session_id: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.MOVED_TEMPORARILY]: {
      description: 'Redirect to welcome page',
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Invalid request'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to process subscription'
    ),
  },
})

export type SubscriptionSuccessRoute = typeof subscriptionSuccess
