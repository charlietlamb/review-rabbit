'use server'

import client from '@ff/design-system/lib/client'
import { headersWithCookies } from '@ff/design-system/lib/header-with-cookies'

export async function disconnectAccount(connectionId: string) {
  const response = await client.connect[':connectionId'].$delete(
    {
      param: { connectionId },
    },
    await headersWithCookies()
  )
  const json = await response.json()

  if ('error' in json) {
    console.error(json.error)
    return false
  }

  return json.success
}
