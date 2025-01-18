'use server'

import { ClickWithData } from '@rabbit/database/schema/app/clicks'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformClick } from '@rabbit/design-system/lib/transforms/click-transform'

export async function getClicksByDateRange(
  from: Date,
  to: Date,
  businessId: string,
  automationItemId?: string
): Promise<ClickWithData[]> {
  const response = await client.clicks['date-range'].$post(
    {
      json: {
        from: from.toISOString(),
        to: to.toISOString(),
        businessId,
        automationItemId,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clicks by date range')
  }
  const clicksResults = await response.json()
  return clicksResults.map(transformClick)
}
