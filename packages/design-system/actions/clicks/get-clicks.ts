'use server'

import { ClickWithData } from '@rabbit/database/schema/app/clicks'
import client from '@rabbit/design-system/lib/client'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformClick } from '@rabbit/design-system/lib/transforms/click-transform'

export async function getClicks(
  page: number,
  businessId: string,
  automationItemId?: string
): Promise<ClickWithData[]> {
  const response = await client.clicks.$post(
    {
      json: {
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        businessId,
        automationItemId,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clicks')
  }
  const clicksResults = await response.json()
  return clicksResults.map(transformClick)
}
