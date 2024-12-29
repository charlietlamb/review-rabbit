import { hc } from 'hono/client'
import type { AppType } from '@burse/hono'
import { getEnv } from '@burse/env'

const client = hc<AppType>(getEnv().NEXT_PUBLIC_API)

export default client
