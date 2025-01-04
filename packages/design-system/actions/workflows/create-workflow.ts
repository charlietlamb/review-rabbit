'use server'

import { WorkflowForm } from '@rabbit/database/types/workflow-types'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function createWorkflow(workflow: WorkflowForm) {
  const response = await client.workflows.create.$post(
    {
      json: workflow,
    },
    await headersWithCookies()
  )
  const data = await response.json()
  return { status: response.status, id: data }
}
