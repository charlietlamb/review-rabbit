'use server'

import { BusinessForm } from '@rabbit/database/schema/app/businesses'
import type { z } from 'zod'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function updateBusiness(
  business: BusinessForm,
  businessId: string
) {
  const response = await client['business'].update.$post(
    {
      json: { ...business, id: businessId },
    },
    await headersWithCookies()
  )
  return response.status
}
