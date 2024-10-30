import { selectUserSchema } from '@/src/db/schema/users'
import { HttpStatusCodes } from '@/src/http'
import { createRoute } from '@hono/zod-openapi'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { authResponses } from './auth.schema'
const tags = ['Auth']

export const user = createRoute({
  path: '/auth/user',
  method: 'post',
  summary: 'Get user',
  tags,
  request: {
    body: jsonContentRequired(z.object({ session: z.string() }), 'JWT'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'User'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ error: z.string() }),
      'User not found'
    ),
    ...authResponses,
  },
})

export type UserRoute = typeof user
