import { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import { PinoLogger } from 'hono-pino'
import { User } from '../db/schema/users'

export interface AppBindings {
  Variables: {
    logger: PinoLogger
    user: User
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>
