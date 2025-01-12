'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { AutomationForm } from '@rabbit/database/types/automation-types'

export async function triggerDemoAutomation(email: string, workflow: Workflow) {
  const response = await client.automations['trigger-demo'].$post(
    {
      json: { email, workflow },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  return { status: response.status, id: data }
}
