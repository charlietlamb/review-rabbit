'use server'

import { WorkflowWithItems } from '@rabbit/database/schema/app/workflows'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getWorkflowById(id: string): Promise<WorkflowWithItems> {
  const response = await client.workflows['get-by-id'].$post(
    {
      json: {
        id,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch workflow')
  }
  const workflowResponse = await response.json()

  return {
    ...workflowResponse,
    createdAt: new Date(workflowResponse.createdAt),
    updatedAt: new Date(workflowResponse.updatedAt),
    items: workflowResponse.items.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })),
  }
}
