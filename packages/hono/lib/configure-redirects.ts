import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { getEnv } from '@rabbit/env'
import { HttpStatusCodes } from '@rabbit/http'

export default function configureRedirects(app: AppOpenAPI) {
  app.use('/redirect/:path', async (c) => {
    const path = c.req.param('path')
    if (!path) {
      return c.json({ error: 'Path is required' }, HttpStatusCodes.BAD_REQUEST)
    }
    if (path === 'index') {
      return c.redirect(`${getEnv().NEXT_PUBLIC_WEB}/`)
    } else if (c.req.url.includes('token=')) {
      return c.redirect(
        `${getEnv().NEXT_PUBLIC_WEB}/${path}?token=${c.req.url.split('token=')[1]}`
      )
    }
    return c.redirect(`${getEnv().NEXT_PUBLIC_WEB}/${path}`)
  })
}
