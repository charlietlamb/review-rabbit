import createApp from '@/src/lib/create-app'
import configure from '@/src/lib/configure'
import index from '@/src/routes/index.route'
import users from '@/src/routes/user/user.index'
import s3 from '@/src/routes/s3/s3.index'
import media from '@/src/routes/media/media.index'
import dub from '@/src/routes/dub/dub.index'

const app = createApp()
const routes = [index, users, s3, media, dub] as const

configure(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app

export type AppType = (typeof routes)[number]
export type TestType = { test: string }
export type App = typeof app
