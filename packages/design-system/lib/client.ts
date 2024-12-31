import { hc } from 'hono/client'
import type { AppType } from '@rabbit/hono'
import { getEnv } from '@rabbit/env'

const client = hc<AppType>(getEnv().NEXT_PUBLIC_API)

export default client
