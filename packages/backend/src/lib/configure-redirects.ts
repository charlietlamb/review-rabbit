import { AppOpenAPI } from '@/src/lib/types'
import env from '../env'
import { HttpStatusCodes } from '../http'

export default function configureRedirects(app: AppOpenAPI) {
  app.use('/redirect/:path', async (c) => {
    const path = c.req.param('path')
    if (!path) {
      return c.json({ error: 'Path is required' }, HttpStatusCodes.BAD_REQUEST)
    }
    if (path === 'index') {
      return c.redirect(`${env.FRONTEND_URL}/`)
    } else if (c.req.url.includes('token=')) {
      return c.redirect(
        `${env.FRONTEND_URL}/${path}?token=${c.req.url.split('token=')[1]}`
      )
    }
    return c.redirect(`${env.FRONTEND_URL}/${path}`)
  })
}
