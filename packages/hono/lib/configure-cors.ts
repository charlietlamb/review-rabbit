import { AppOpenAPI } from '@dubble/hono/lib/types'
import { cors } from 'hono/cors'
import { env } from '@dubble/env'

export default function configureCors(app: AppOpenAPI) {
  app.use(
    '*',
    cors({
      origin: env.NEXT_PUBLIC_WEB,
      allowHeaders: [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization',
      ],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  )
}
