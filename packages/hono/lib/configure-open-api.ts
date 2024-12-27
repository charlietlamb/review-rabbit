import { AppOpenAPI } from '@burse/hono/lib/types'
import { apiReference } from '@scalar/hono-api-reference'
import { env } from '@burse/env'

export default function configureOpenAPI(app: AppOpenAPI) {
  if (env.NODE_ENV === 'development') {
    app.doc('/doc', {
      openapi: '3.0.0',
      info: {
        title: 'burse API',
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
}
