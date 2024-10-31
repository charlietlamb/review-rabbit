import { AppOpenAPI } from '@/src/lib/types'
import { apiReference } from '@scalar/hono-api-reference'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'remio API',
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
