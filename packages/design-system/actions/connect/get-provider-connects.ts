'use server'

import { Connect } from '@ff/database/schema/connects'
import client from '@ff/design-system/lib/client'
import { headersWithCookies } from '@ff/design-system/lib/header-with-cookies'

export async function getProviderConnects(providerId: string) {
  const response = await client.connect[':providerId'].get.$get(
    {
      param: { providerId },
    },
    await headersWithCookies()
  )
  const json = await response.json()
  if ('error' in json) {
    console.error(json.error)
    return []
  }
  const connectionsWithDates = json.connections.map((connection) => ({
    ...connection,
    createdAt: new Date(connection.createdAt),
    updatedAt: new Date(connection.updatedAt),
    expiresAt: connection.expiresAt ? new Date(connection.expiresAt) : null,
  }))
  return connectionsWithDates as Connect[]
}
