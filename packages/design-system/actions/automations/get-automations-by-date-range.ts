'use server'

import { AutomationWithItems } from '@rabbit/database/types/automation-types'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getAutomationsByDateRange(
  from: Date,
  to: Date
): Promise<AutomationWithItems[]> {
  const response = await client.automations['get-by-date-range'].$post(
    {
      json: {
        from,
        to,
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
