import { hc } from 'hono/client'
import type { AppType } from '@ff/hono'
import { env } from '@ff/env'

const client = hc<AppType>(env.NEXT_PUBLIC_API)

export default client
