import createApp from '@burse/hono/lib/create-app'
import configure from '@burse/hono/lib/configure'
import index from '@burse/hono/routes/index.route'
import users from '@burse/hono/routes/user/user.index'
import s3 from '@burse/hono/routes/s3/s3.index'
import stripe from '@burse/hono/routes/stripe/stripe.index'
import stripeConnects from '@burse/hono/routes/stripe-connects/stripe-connects.index'

const app = createApp()
const routes = [index, users, s3, stripe, stripeConnects] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
