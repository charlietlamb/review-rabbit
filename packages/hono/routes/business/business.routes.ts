import {
  businessFormSchema,
  businessFormWithIdSchema,
} from '@rabbit/database/schema/app/businesses'
import { createRoute, z } from '@hono/zod-openapi'
import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@rabbit/hono/lib/configure-auth'
import {
  idRequestSchema,
  paginationRequestSchema,
} from '@rabbit/hono/types/request'
import { businessSelectSchema } from '@rabbit/database/schema/app/businesses'
const tags = ['Businesses']

export const create = createRoute({
  path: '/business/create',
  method: 'post',
  summary: 'Create a business',
  tags,
  request: {
    body: jsonContent(businessFormSchema, 'Business form.'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Business created.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to create business.'
    ),
    ...unauthorizedSchema,
  },
})

export type CreateBusinessRoute = typeof create

export const get = createRoute({
  path: '/business/get',
  method: 'post',
  summary: 'Get businesses',
  tags,
  request: {
    body: jsonContent(paginationRequestSchema, 'Pagination request.'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(businessSelectSchema),
      'Businesses retrieved.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to retrieve businesses.'
    ),
    ...unauthorizedSchema,
  },
})

export type GetBusinessRoute = typeof get

export const getById = createRoute({
  path: '/business/get-by-id',
  method: 'post',
  summary: 'Get a business by its ID',
  tags,
  request: {
    body: jsonContent(idRequestSchema, 'ID request.'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      businessSelectSchema,
      'Business retrieved.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to retrieve businesses.'
    ),
    ...unauthorizedSchema,
  },
})

export type GetBusinessByIdRoute = typeof getById

export const update = createRoute({
  path: '/business/update',
  method: 'post',
  summary: 'Update a business',
  tags,
  request: {
    body: jsonContent(businessFormWithIdSchema, 'Business form with ID.'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Business updated.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update business.'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateBusinessRoute = typeof update

export const deleteBusiness = createRoute({
  path: '/business/delete',
  method: 'post',
  summary: 'Delete a business',
  tags,
  request: {
    body: jsonContent(idRequestSchema, 'ID request.'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Business deleted.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete business.'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteBusinessRoute = typeof deleteBusiness
