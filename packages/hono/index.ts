import createApp from '@dubble/hono/lib/create-app'
import configure from '@dubble/hono/lib/configure'
import index from '@dubble/hono/routes/index.route'
import users from '@dubble/hono/routes/user/user.index'
import s3 from '@dubble/hono/routes/s3/s3.index'
import media from '@dubble/hono/routes/media/media.index'
import dub from '@dubble/hono/routes/dub/dub.index'
import connect from '@dubble/hono/routes/connect/connect.index'

const app = createApp()
const routes = [index, users, s3, media, dub, connect] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
