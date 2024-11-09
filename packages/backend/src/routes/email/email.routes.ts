import { selectUserSchema } from '@/src/db/schema/users'
import { HttpStatusCodes } from '@/src/http'
import { createRoute } from '@hono/zod-openapi'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { emailResponseSchema } from './email.schema'
import { unauthorizedSchema } from '@/src/lib/configure-auth'
const tags = ['Email']

export const sendVerifyEmail = createRoute({
  path: '/email/verify',
  method: 'post',
  summary: 'Send verify email',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(emailResponseSchema, 'Success'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ error: z.string() }),
      'User not found'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      'Failed to send email'
    ),
    ...unauthorizedSchema,
  },
})

export type SendVerifyEmailRoute = typeof sendVerifyEmail
