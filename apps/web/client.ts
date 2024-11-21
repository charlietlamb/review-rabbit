import { hc } from 'hono/client'
import type { AppType } from '@dubble/hono'

const client = hc<AppType>('http://localhost:8000')

export default client
