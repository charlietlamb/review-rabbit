'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { AutomationItemPartial } from '@rabbit/database/types/automation-types'

export async function updateAutomationItem(
  automation: AutomationItemPartial,
  id: string
) {
  const response = await client.automations.items.update.$post(
    {
      json: { id, ...automation },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  return { status: response.status, id: data }
}
