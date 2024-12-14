'use server'

import client from '@remio/design-system/lib/client'
import { headersWithCookies } from 'lib/header-with-cookies'

export async function deleteMediation(mediationId: string) {
  const response = await client.mediations.delete.$post(
    {
      json: { id: mediationId },
    },
    await headersWithCookies()
  )

  return response.json()
}
