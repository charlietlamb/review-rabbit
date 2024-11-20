import { hc } from 'hono/client'
import type { AppType } from '../api/src/app'

const client = hc<AppType>('http://localhost:8000')

export default client
