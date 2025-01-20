import { Redis } from '@upstash/redis'
import { EnvType } from '@rabbit/env'

let kvInstance: Redis | null = null

export function getKv(env: EnvType) {
  if (!kvInstance) {
    kvInstance = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  return kvInstance
}
