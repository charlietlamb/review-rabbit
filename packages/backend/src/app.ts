import createApp from '@/lib/create-app'
import configureOpenAPI from '@/lib/configure-open-api'
import index from '@/routes/index.route'
import users from '@/routes/user/user.index'
import s3 from '@/routes/s3/s3.index'
import { cors } from 'hono/cors'

const app = createApp()
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['*'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposeHeaders: ['*'],
    maxAge: 600,
    credentials: true,
  })
)

const routes = [index, users, s3] as const

configureOpenAPI(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
