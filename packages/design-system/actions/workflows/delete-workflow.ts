'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function deleteWorkflow(workflowId: string) {
  const response = await client.workflows.delete.$post(
    {
      json: { id: workflowId },
    },
    await headersWithCookies()
  )
  return response.status
}
