'use server'

import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'

export async function getWorkflows(
  page: number,
  search?: string
): Promise<WorkflowWithItems[]> {
  const response = await client.workflows.$post(
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
  return json.map((workflow: any) => ({
    ...workflow,
    createdAt: new Date(workflow.createdAt),
    updatedAt: new Date(workflow.updatedAt),
  }))
}
