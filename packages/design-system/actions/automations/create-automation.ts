'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { AutomationForm } from '@rabbit/database/types/automation-types'

export async function createAutomation(automation: AutomationForm) {
  const response = await client.automations.create.$post(
    {
      json: automation,
    },
    await headersWithCookies()
  )
  const data = await response.json()
  return { status: response.status, id: data }
}
