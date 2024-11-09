import { AppOpenAPI } from './types'
import { cors } from 'hono/cors'

export default function configureCors(app: AppOpenAPI) {
  app.use(
    '*',
    cors({
      origin: 'http://localhost:3000',
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
