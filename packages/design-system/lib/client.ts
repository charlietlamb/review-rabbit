import { hc } from 'hono/client'
import type { AppType } from '@remio/hono'
import { env } from '@remio/env'

const client = hc<AppType>(env.NEXT_PUBLIC_API)

export default client
