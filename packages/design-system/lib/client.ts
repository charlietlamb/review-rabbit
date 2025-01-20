import { hc } from 'hono/client'
import type { AppType } from '@rabbit/hono'
import { env } from '@rabbit/env'

const client = hc<AppType>(env.NEXT_PUBLIC_API)

export default client
