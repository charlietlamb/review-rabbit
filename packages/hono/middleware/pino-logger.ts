import { getEnv } from '@rabbit/env'
import { logger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger() {
  return logger({
    pino: pino(
      { level: getEnv().LOG_LEVEL || 'info' },
      getEnv().NODE_ENV === 'production' ? undefined : pretty()
    ),
    http: {
      reqId: () => {
        return crypto.randomUUID()
      },
    },
  })
}
