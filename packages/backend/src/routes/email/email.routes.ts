import { selectUserSchema } from '@/src/db/schema/users'
import { HttpStatusCodes } from '@/src/http'
import { createRoute } from '@hono/zod-openapi'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { authResponses } from '../auth/auth.schema'
import { emailResponseSchema } from './email.schema'
const tags = ['Email']

export const sendVerifyEmail = createRoute({
  path: '/auth/email/verify',
  method: 'post',
  summary: 'Send verify email',
  tags,
  request: {
    body: jsonContentRequired(z.object({ session: z.string() }), 'JWT'),
  },
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
    ...authResponses,
  },
})

export type SendVerifyEmailRoute = typeof sendVerifyEmail

export const verifyEmail = createRoute({
  path: '/email/verification',
  method: 'post',
  summary: 'Verify email',
  tags,
  request: {
    body: jsonContentRequired(z.object({ token: z.string() }), 'Token'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(emailResponseSchema, 'Success'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ error: z.string() }),
      'Token not found'
    ),
  },
})

export type VerifyEmailRoute = typeof verifyEmail

export const sendResetPasswordEmail = createRoute({
  path: '/email/reset',
  method: 'post',
  summary: 'Send reset password email',
  tags,
  request: {
    body: jsonContentRequired(z.object({ email: z.string().email() }), 'Email'),
  },
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
  },
})

export type SendResetPasswordEmailRoute = typeof sendResetPasswordEmail
