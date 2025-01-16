import { Redis } from '@upstash/redis'
import { getEnv } from '@rabbit/env'

export const kv = new Redis({
  url: getEnv().UPSTASH_REDIS_REST_URL,
  token: getEnv().UPSTASH_REDIS_REST_TOKEN,
})
