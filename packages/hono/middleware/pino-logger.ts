import { Context, MiddlewareHandler } from 'hono'
import { logger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger(): MiddlewareHandler {
  return async (c, next) => {
    const loggerMiddleware = logger({
      pino: pino(
        { level: c.env.LOG_LEVEL || 'info' },
        c.env.NODE_ENV === 'production' ? undefined : pretty()
      ),
      http: {
        reqId: () => {
          return crypto.randomUUID()
        },
      },
    })
    return loggerMiddleware(c, next)
  }
}
