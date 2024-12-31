'use server'

import { Business } from '@rabbit/database/schema/app/businesses'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'

export async function getBusinesses(page: number): Promise<Business[]> {
  const response = await client['business'].get.$post(
    {
      json: { offset: page * PAGE_SIZE, limit: PAGE_SIZE },
    },
    await headersWithCookies()
  )
  const json = await response.json()
  if ('error' in json) {
    throw new Error(json.error)
  }
  return json.map((business: any) => ({
    ...business,
    createdAt: new Date(business.createdAt),
    updatedAt: new Date(business.updatedAt),
  }))
}
