'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { WorkflowForm } from '@rabbit/database/types/workflow-types'

export async function triggerDemoAutomation(
  email: string,
  workflow: WorkflowForm
) {
  const response = await client.automations['trigger-demo'].$post(
    {
      json: { email, workflow },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  return { status: response.status, id: data }
}
