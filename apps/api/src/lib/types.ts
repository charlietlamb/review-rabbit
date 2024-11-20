import { OpenAPIHono, RouteConfig, RouteHandler, z } from '@hono/zod-openapi'
import { PinoLogger } from 'hono-pino'
import { auth } from '@/auth'

type Session = typeof auth.$Infer.Session.session
type User = typeof auth.$Infer.Session.user
export interface AppBindings {
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

export const plans = ['free', 'plan1', 'plan2', 'plan3'] as const
export type Plan = (typeof plans)[number]

export const stripeMetaDataSchema = z.object({
  session: z.string(),
  plan: z.enum(plans),
})
