'use server'

import { BusinessForm } from '@rabbit/database/schema/app/businesses'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function createBusiness(business: BusinessForm) {
  const response = await client['business'].create.$post(
    {
      json: business,
    },
    await headersWithCookies()
  )
  return response.status
}
