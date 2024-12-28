import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@burse/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@burse/hono/lib/configure-auth'
import {
  selectStripeProductSchema,
  selectStripeProductWithDataSchema,
} from '@burse/database/schema/stripe-products'
import {
  createProductFormSchema,
  productFormSchema,
} from '@burse/design-system/types/stripe/products'
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
            stripeConnectId: z.string(),
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

export const getStripeProductById = createRoute({
  path: '/stripe-products/by-id',
  method: 'post',
  summary: 'Get a Stripe Product by ID',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            stripeProductId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        stripeProduct: selectStripeProductWithDataSchema,
      }),
      'Successfully retrieved stripe product'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch stripe product'
    ),
    ...unauthorizedSchema,
  },
})

export type GetStripeProductByIdRoute = typeof getStripeProductById

export const createStripeProduct = createRoute({
  path: '/stripe-products/create',
  method: 'post',
  summary: 'Create a Stripe Product',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: createProductFormSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Successfully created stripe product'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
        details: z.string().optional(),
      }),
      'Invalid request data or Stripe API error'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Stripe Connect account not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
        details: z.string().optional(),
      }),
      'Failed to create stripe product'
    ),
    ...unauthorizedSchema,
  },
})
export type CreateStripeProductRoute = typeof createStripeProduct

export const updateStripeProduct = createRoute({
  path: '/stripe-products/update',
  method: 'post',
  summary: 'Update a Stripe Product',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: productFormSchema.extend({
            productId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Successfully updated stripe product'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
        details: z.string().optional(),
      }),
      'Invalid request data or Stripe API error'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Stripe Connect account not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
        details: z.string().optional(),
      }),
      'Failed to update stripe product'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateStripeProductRoute = typeof updateStripeProduct

export const deleteStripeProduct = createRoute({
  path: '/stripe-products/delete',
  method: 'post',
  summary: 'Delete a Stripe Product',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            productId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Successfully deleted stripe product'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Stripe product not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete stripe product'
    ),
    ...unauthorizedSchema,
  },
})
export type DeleteStripeProductRoute = typeof deleteStripeProduct
