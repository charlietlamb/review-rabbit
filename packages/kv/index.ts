import { Redis } from '@upstash/redis'
import { EnvType } from '@rabbit/env'

export function getKv(env: EnvType) {
  return new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  })
}
