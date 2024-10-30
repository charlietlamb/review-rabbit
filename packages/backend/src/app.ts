import createApp from '@/src/lib/create-app'
import index from '@/src/routes/index.route'
import users from '@/src/routes/user/user.index'
import s3 from '@/src/routes/s3/s3.index'
import auth from '@/src/routes/auth/auth.index'
import configure from '@/src/lib/configure'

const app = createApp()
const routes = [index, users, s3, auth] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
