import { AppBindings, AppOpenAPI } from '@rabbit/hono/lib/types'
import { createMiddleware } from 'hono/factory'
import { getAuth } from '@rabbit/auth'
import { HttpStatusCodes } from '@rabbit/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { z } from 'zod'

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  console.log('session', session)
  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)
  return next()
})

export default function configureAuth(app: AppOpenAPI) {
  app.use('*', authMiddleware)
}

export const unauthorizedSchema = {
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    z.object({ error: z.string() }),
    'Unauthorized'
  ),
}
