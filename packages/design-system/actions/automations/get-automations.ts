'use server'

import { AutomationWithItems } from '@rabbit/database/types/automation-types'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'

export async function getAutomations(
  page: number,
  search?: string
): Promise<AutomationWithItems[]> {
  const response = await client.automations.$post(
    {
      json: {
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        search: search ?? '',
      },
    },
    await headersWithCookies()
  )
  const json = await response.json()
  if ('error' in json) {
    throw new Error(json.error)
  }
  return json.map((automation: any) => ({
    ...automation,
    createdAt: new Date(automation.createdAt),
    updatedAt: new Date(automation.updatedAt),
  }))
}
