import createApp from '@ff/hono/lib/create-app'
import configure from '@ff/hono/lib/configure'
import index from '@ff/hono/routes/index.route'
import users from '@ff/hono/routes/user/user.index'
import s3 from '@ff/hono/routes/s3/s3.index'
import media from '@ff/hono/routes/media/media.index'
import connect from '@ff/hono/routes/connect/connect.index'

const app = createApp()
const routes = [index, users, s3, media, connect] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
