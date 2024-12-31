import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { cors } from 'hono/cors'
import { getEnv } from '@rabbit/env'

export default function configureCors(app: AppOpenAPI) {
  app.use('*', async (c, next) => {
    const corsMiddlewareHandler = cors({
      origin: [getEnv().NEXT_PUBLIC_WEB, getEnv().NEXT_PUBLIC_API],
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
    return corsMiddlewareHandler(c, next)
  })
}
