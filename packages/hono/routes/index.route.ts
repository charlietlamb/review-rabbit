import { createRouter } from '@dubble/hono/lib/create-app'
import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import * as HttpStatusCodes from 'stoker/http-status-codes'

const router = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    summary: 'Get the index',
    tags: ['Index'],
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          message: z.string(),
        }),
        'dubble API index!'
      ),
    },
  }),
  (c) => {
    return c.json({ message: 'dubble API index!' }, HttpStatusCodes.OK)
  }
)

export default router