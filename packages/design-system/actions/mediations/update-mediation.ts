'use server'

import { MediationData } from '@remio/design-system/components/dashboard/mediation/mediation-types'
import client from '@remio/design-system/lib/client'
import { headersWithCookies } from 'lib/header-with-cookies'

export async function updateMediation(
  data: MediationData,
  mediationId: string
) {
  const response = await client.mediations.update.$post(
    {
      json: { ...data, id: mediationId },
    },
    await headersWithCookies()
  )

  return response.json()
}
