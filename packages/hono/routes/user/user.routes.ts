import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { updateUserSchema } from './user.schema'
import { selectUserSchema } from '@rabbit/database/schema/auth/users'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'

const tags = ['Users']

export const get = createRoute({
  path: '/user/get/:userId',
  method: 'get',
  summary: 'Get a user by their ID',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'User information.'),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User ID is required'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User not found'
    ),
  },
})

export type GetUserRoute = typeof get

export const update = createRoute({
  path: '/user/update',
  method: 'post',
  summary: 'Update a user by their ID',
  tags,
  request: {
    body: {
      description: 'User update information',
      content: {
        'application/json': {
          schema: updateUserSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUserSchema,
      'User update information.'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Incorrect body sent'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User not found'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateUserRoute = typeof update

export const updateCurrency = createRoute({
  path: '/user/update-currency',
  method: 'post',
  summary: 'Update a user currency',
  tags,
  request: {
    body: {
      description: 'User currency',
      content: {
        'application/json': {
          schema: z.object({
            currency: z.string(),
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
      'User currency updated.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Internal server error'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateCurrencyRoute = typeof updateCurrency

export const resetPassword = createRoute({
  path: '/user/reset-password',
  method: 'post',
  summary: 'Reset a user password',
  tags,
  request: {
    body: {
      description: 'User token & new password',
      content: {
        'application/json': {
          schema: z.object({
            token: z.string(),
            password: z.string(),
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
      'User password reset.'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Incorrect body sent'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'User not found'
    ),
  },
})

export type ResetPasswordRoute = typeof resetPassword
