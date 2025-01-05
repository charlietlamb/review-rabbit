import { HttpStatusCodes } from '@rabbit/http'
import {
  db,
  workflows,
  workflowItems,
  automations,
  automationItems,
  clients,
  businesses,
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
import { triggerAutomation } from '@rabbit/trigger'
import type { Client } from '@rabbit/database/schema/app/clients'

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
        const business = await tx.query.businesses.findFirst({
          where: eq(businesses.id, businessId),
        })

        if (!business) {
          throw new Error('Business not found')
        }

        const matchingClients = await tx.query.clients.findMany({
          where: sql`${clients.id} IN ${clientIds}`,
        })

        if (matchingClients.length !== clientIds.length) {
          throw new Error('Some clients not found')
        }

        const clientMap = new Map<string, Client>(
          matchingClients.map((client) => [client.id, client])
        )
        for (const item of workflow.items) {
          if (!item.content.length) continue

          const delayInMinutes = item.time
          const baseTime = new Date(Date.now() + item.time * 60 * 1000)

          const automationItemsToInsert = clientIds.map((clientId) => ({
            id: uuidv4(),
            automationId,
            clientId,
            taskId: item.id,
            method: item.method,
            type: item.type,
            content: item.content,
            delayInMinutes,
            time: baseTime,
          }))

          await tx.insert(automationItems).values(automationItemsToInsert)

          for (const automationItem of automationItemsToInsert) {
            const client = clientMap.get(automationItem.clientId)
            if (!client) continue
            await triggerAutomation(automationItem, client, business)
          }
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
