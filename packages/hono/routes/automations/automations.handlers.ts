import { HttpStatusCodes } from '@rabbit/http'
import {
  db,
  workflows,
  workflowItems,
  automations,
  automationItems,
} from '@rabbit/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetAutomationsRoute,
  CreateAutomationRoute,
  UpdateAutomationRoute,
  DeleteAutomationRoute,
  GetAutomationByIdRoute,
} from './automations.routes'
import { eq, sql, and, or } from 'drizzle-orm'
import type {
  AutomationForm,
  AutomationWithItems,
} from '@rabbit/database/types/automation-types'
import type { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { v4 as uuidv4 } from 'uuid'

export const getAutomations: AppRouteHandler<GetAutomationsRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, search } = await c.req.json()

  try {
    const results = await db.query.automations.findMany({
      where: and(
        eq(automations.userId, user.id),
        or(
          sql`LOWER(${automations.title}) LIKE ${`%${search?.toLowerCase()}%`}`
        )
      ),
      offset,
      limit,
      orderBy: (automations, { desc }) => [desc(automations.createdAt)],
      with: {
        business: true,
        items: true,
      },
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching automations:', error)
    return c.json(
      { error: 'Failed to fetch automations' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getAutomationById: AppRouteHandler<
  GetAutomationByIdRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    const automation = await db.query.automations.findFirst({
      where: and(eq(automations.id, id), eq(automations.userId, user.id)),
      with: {
        items: true,
        business: true,
      },
    })
    if (!automation) {
      return c.json(
        { error: 'Automation not found' },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(automation, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching automation:', error)
    return c.json(
      { error: 'Failed to fetch automation' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const createAutomation: AppRouteHandler<CreateAutomationRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { clientIds, businessId, workflowId, title } = await c.req.valid('json')
  const automationId = uuidv4()

  const workflow = (await db.query.workflows.findFirst({
    where: and(eq(workflows.id, workflowId), eq(workflows.userId, user.id)),
    with: {
      items: true,
    },
  })) as WorkflowWithItems

  if (!workflow) {
    return c.json({ error: 'Workflow not found' }, HttpStatusCodes.NOT_FOUND)
  }

  try {
    await db.transaction(async (tx) => {
      await tx.insert(automations).values({
        id: automationId,
        userId: user.id,
        businessId,
        title,
      })

      if (clientIds && clientIds.length > 0) {
        for (const item of workflow.items) {
          if (!item.content.length) continue
          await tx.insert(automationItems).values(
            clientIds.map((clientId) => ({
              automationId,
              clientId,
              taskId: item.id,
              method: item.type,
              content: item.content,
              time: new Date(Date.now() + item.time * 60 * 1000),
            }))
          )
        }
      }
    })

    return c.json(automationId, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error adding automation:', error)
    return c.json(
      { error: 'Failed to add automation' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
