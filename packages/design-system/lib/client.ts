import { hc } from 'hono/client'
import type { AppType } from '@dubble/hono'
import { env } from '@dubble/env'

const client = hc<AppType>(env.NEXT_PUBLIC_API)

export default client
