import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@burse/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@burse/hono/lib/configure-auth'
import { selectStripeProductSchema } from '@burse/database/schema/stripe-products'

const tags = ['Stripe Products']

export const getStripeProducts = createRoute({
  path: '/stripe-products',
  method: 'post',
  summary: 'Get all Stripe Products',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        stripeProducts: z.array(selectStripeProductSchema),
      }),
      'Successfully retrieved stripe products'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch stripe products'
    ),
    ...unauthorizedSchema,
  },
})
export type GetStripeProductsRoute = typeof getStripeProducts
