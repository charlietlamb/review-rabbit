import createApp from '@rabbit/hono/lib/create-app'
import configure from '@rabbit/hono/lib/configure'
import index from '@rabbit/hono/routes/index.route'
import users from '@rabbit/hono/routes/user/user.index'
import s3 from '@rabbit/hono/routes/s3/s3.index'
import business from '@rabbit/hono/routes/business/business.index'
import review from '@rabbit/hono/routes/review/review.index'

const app = createApp()
const routes = [index, users, s3, business, review] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
