'use server'

import { MediationData } from '@remio/design-system/components/dashboard/mediation/mediation-types'
import client from '@remio/design-system/lib/client'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function addMediation(data: MediationData) {
  const response = await client.mediations.add.$post(
    {
      json: data,
    },
    await headersWithCookies()
  )

  return response.json()
}
