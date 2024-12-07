import createApp from '@remio/hono/lib/create-app'
import configure from '@remio/hono/lib/configure'
import index from '@remio/hono/routes/index.route'
import users from '@remio/hono/routes/user/user.index'
import s3 from '@remio/hono/routes/s3/s3.index'
import media from '@remio/hono/routes/media/media.index'
import stripe from '@remio/hono/routes/stripe/stripe.index'

const app = createApp()
const routes = [index, users, s3, media, stripe] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
