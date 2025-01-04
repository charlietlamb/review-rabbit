'use server'

import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { WorkflowForm } from '@rabbit/database/types/workflow-types'
import client from '@rabbit/design-system/lib/client'

export async function updateWorkflow(
  newWorkflow: WorkflowForm,
  id: string
): Promise<number> {
  const response = await client.workflows.update.$post(
    { json: { ...newWorkflow, id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to update workflow')
  }
  return response.status
}
