import { hc } from 'hono/client'
import type { AppType } from '@burse/hono'
import { env } from '@burse/env'

const client = hc<AppType>(env.NEXT_PUBLIC_API)

export default client
