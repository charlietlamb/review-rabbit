import { OpenAPIHono, RouteConfig, RouteHandler, z } from '@hono/zod-openapi'
import { PinoLogger } from 'hono-pino'
import { auth } from '@rabbit/auth'
import { Env } from '@rabbit/hono/types/env'

type Session = typeof auth.$Infer.Session.session
type User = typeof auth.$Infer.Session.user
export interface AppBindings {
  Variables: {
    logger: PinoLogger
    user: User | null
    session: Session | null
    env: Env
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>

export const plans = ['free', 'plus', 'pro', 'enterprise'] as const
export type Plan = (typeof plans)[number]

export const stripeMetaDataSchema = z.object({
  session: z.string(),
  plan: z.enum(plans),
})
