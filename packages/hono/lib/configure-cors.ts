import { AppOpenAPI } from '@dubble/hono/lib/types'
import { cors } from 'hono/cors'
import { env } from '@dubble/env'

export default function configureCors(app: AppOpenAPI) {
  const origin = env.NEXT_PUBLIC_WEB.replace(/\/$/, '')

  app.use(
    '*',
    cors({
      origin: [origin],
      allowHeaders: [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
      ],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
      exposeHeaders: ['Content-Length', 'Content-Type'],
      maxAge: 600,
      credentials: true,
    })
  )
}
