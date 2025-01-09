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
  GetAutomationByIdRoute,
  GetAutomationItemsByDateRoute,
  UpdateAutomationItemRoute,
  UpdateAutomationItemStatusRoute,
} from './automations.routes'
import { eq, sql, and, or, gte, lte } from 'drizzle-orm'
import type { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { v4 as uuidv4 } from 'uuid'
import { triggerWorkflow } from '@rabbit/trigger'

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

export const getAutomationItemsByDate: AppRouteHandler<
  GetAutomationItemsByDateRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { startDate, endDate } = await c.req.valid('json')
  try {
    const automationResults = await db.query.automationItems.findMany({
      where: and(
        eq(automationItems.userId, user.id),
        gte(automationItems.scheduledFor, new Date(startDate)),
        lte(automationItems.scheduledFor, new Date(endDate))
      ),
      with: {
        automation: true,
        client: true,
        workflowItem: true,
      },
    })
    if (!automationResults) {
      return c.json(
        { error: 'Automation not found' },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(automationResults, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching automation items:', error)
    return c.json(
      { error: 'Failed to fetch automation items' },
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

        for (const item of workflow.items) {
          if (!item.content.length) continue

          const delayInMinutes = item.time
          const baseTime = new Date(Date.now() + item.time * 60 * 1000)

          const automationItemsToInsert = clientIds.map((clientId) => ({
            id: uuidv4(),
            userId: user.id,
            automationId,
            clientId,
            workflowItemId: item.id,
            taskId: item.id,
            method: item.method,
            type: item.type,
            content: item.content,
            delayInMinutes,
            scheduledFor: baseTime,
          }))

          await tx.insert(automationItems).values(automationItemsToInsert)

          const clientsWithAutomationItemIds = automationItemsToInsert.map(
            (automationItem) => ({
              client: matchingClients.find(
                (client) => client.id === automationItem.clientId
              )!,
              automationItemId: automationItem.id,
            })
          )

          triggerWorkflow(item, clientsWithAutomationItemIds)
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

export const updateAutomationItem: AppRouteHandler<
  UpdateAutomationItemRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id, ...data } = await c.req.valid('json')

  try {
    await db.update(automationItems).set(data).where(eq(automationItems.id, id))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error updating automation item:', error)
    return c.json(
      { error: 'Failed to update automation item' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const updateAutomationItemStatus: AppRouteHandler<
  UpdateAutomationItemStatusRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id, status } = await c.req.valid('json')
  try {
    await db
      .update(automationItems)
      .set({ status })
      .where(eq(automationItems.id, id))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to update automation item status' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
