import { HttpStatusCodes } from '@/src/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { z } from 'zod'

export const jwtSchema = z.object({
  id: z.string().uuid(),
  expiresAt: z.string().datetime(),
  ipAddress: z.string(),
  userAgent: z.string(),
  userId: z.string().uuid(),
  iat: z.number().int(),
  exp: z.number().int(),
})

export const authResponses = {
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    z.object({
      error: z.string(),
    }),
    'User is not authenticated'
  ),
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
    z.object({
      error: z.string(),
    }),
    'Internal server error'
  ),
}
