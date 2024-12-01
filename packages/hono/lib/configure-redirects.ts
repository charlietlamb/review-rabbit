import { AppOpenAPI } from '@ff/hono/lib/types'
import { env } from '@ff/env'
import { HttpStatusCodes } from '@ff/http'

export default function configureRedirects(app: AppOpenAPI) {
  app.use('/redirect/:path', async (c) => {
    const path = c.req.param('path')
    if (!path) {
      return c.json({ error: 'Path is required' }, HttpStatusCodes.BAD_REQUEST)
    }
    if (path === 'index') {
      return c.redirect(`${env.NEXT_PUBLIC_WEB}/`)
    } else if (c.req.url.includes('token=')) {
      return c.redirect(
        `${env.NEXT_PUBLIC_WEB}/${path}?token=${c.req.url.split('token=')[1]}`
      )
    }
    return c.redirect(`${env.NEXT_PUBLIC_WEB}/${path}`)
  })
}
