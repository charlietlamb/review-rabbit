import { AppOpenAPI } from './types'
import { cors } from 'hono/cors'

export default function configureCors(app: AppOpenAPI) {
  app.use(
    '*',
    cors({
      origin: 'http://localhost:3000',
      allowHeaders: [
        'X-Custom-Header',
        'Upgrade-Insecure-Requests',
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization',
      ],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
      exposeHeaders: [
        'Content-Length',
        'X-Kuma-Revision',
        'Access-Control-Allow-Origin',
      ],
      maxAge: 600,
      credentials: true,
    })
  )
}
