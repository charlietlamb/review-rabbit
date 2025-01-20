import { OpenAPIHono, RouteConfig, RouteHandler, z } from '@hono/zod-openapi'
import { PinoLogger } from 'hono-pino'
import { authSession } from '@rabbit/auth'
import { EnvType } from '@rabbit/env'
import { User } from '@rabbit/database'

type Session = typeof authSession

export interface AppBindings {
  Bindings: EnvType
  Variables: {
    logger: PinoLogger
    user: User | null
    session: Session | null
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>

export const plans = ['free', 'plus', 'pro', 'enterprise'] as const
export type Plan = (typeof plans)[number]
