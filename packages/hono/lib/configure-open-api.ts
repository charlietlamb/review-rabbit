import { AppOpenAPI } from '@dubble/hono/lib/types'
import { apiReference } from '@scalar/hono-api-reference'
import { env } from '@dubble/env'

export default function configureOpenAPI(app: AppOpenAPI) {
  if (env.NODE_ENV === 'development') {
    app.doc('/doc', {
      openapi: '3.0.0',
      info: {
        title: 'dubble API',
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
