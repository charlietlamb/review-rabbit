import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { apiReference } from '@scalar/hono-api-reference'

interface Env {
  Bindings: {
    NODE_ENV: string
  }
}

export default function configureOpenAPI(app: AppOpenAPI) {
  app.use('*', async (c, next) => {
    const env = c.env.NODE_ENV || 'development'
    if (env === 'development') {
      app.doc('/doc', {
        openapi: '3.0.0',
        info: {
          title: 'review-rabbit API',
          version: '0.0.1',
        },
      })

      app.get(
        '/reference',
        apiReference({
          spec: { url: '/doc' },
          theme: 'bluePlanet',
          layout: 'classic',
          defaultHttpClient: {
            targetKey: 'javascript',
            clientKey: 'fetch',
          },
        })
      )
    }
    await next()
  })
}
