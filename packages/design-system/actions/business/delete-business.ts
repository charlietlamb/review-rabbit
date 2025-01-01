'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function deleteBusiness(businessId: string) {
  const response = await client['business'].delete.$post(
    {
      json: { id: businessId },
    },
    await headersWithCookies()
  )
  return response.status
}
