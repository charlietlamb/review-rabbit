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
              workflowId,
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

export const updateAutomation: AppRouteHandler<UpdateAutomationRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  try {
    const data = await c.req.valid('json')
    const { id, items, ...workflowData } = data as WorkflowForm & { id: string }

    await db.transaction(async (tx) => {
      // Update workflow
      await tx
        .update(workflows)
        .set({ ...workflowData, updatedAt: new Date() })
        .where(and(eq(workflows.id, id), eq(workflows.userId, user.id)))

      // Get existing workflow items
      const existingItems = await tx.query.workflowItems.findMany({
        where: eq(workflowItems.workflowId, id),
      })

      // Find items to delete (items that exist but are not in the new items array)
      const itemsToDelete = existingItems.filter(
        (existingItem) =>
          !items?.some((newItem) => newItem.id === existingItem.id)
      )

      // Find items to add (items that don't have an id or their id doesn't exist in current items)
      const itemsToAdd =
        items?.filter(
          (newItem) =>
            !newItem.id ||
            !existingItems.some(
              (existingItem) => existingItem.id === newItem.id
            )
        ) || []

      // Find items to update (items that have an id and exist in current items)
      const itemsToUpdate =
        items?.filter(
          (newItem) =>
            newItem.id &&
            existingItems.some((existingItem) => existingItem.id === newItem.id)
        ) || []

      // Delete items that are no longer needed
      if (itemsToDelete.length > 0) {
        await tx
          .delete(workflowItems)
          .where(
            and(
              eq(workflowItems.workflowId, id),
              sql`${workflowItems.id} IN ${itemsToDelete.map((item) => item.id)}`
            )
          )
      }

      // Add new items
      if (itemsToAdd.length > 0) {
        await tx.insert(workflowItems).values(
          itemsToAdd.map((item) => ({
            id: item.id || uuidv4(),
            workflowId: id,
            content: item.content,
            type: item.type,
            x: item.x,
            y: item.y,
            time: item.time,
            level: item.level,
          }))
        )
      }

      // Update existing items
      for (const item of itemsToUpdate) {
        const { id: itemId, ...itemData } = item
        if (itemId) {
          await tx
            .update(workflowItems)
            .set({
              content: itemData.content,
              type: itemData.type,
              x: itemData.x,
              y: itemData.y,
              time: itemData.time,
              updatedAt: new Date(),
            })
            .where(eq(workflowItems.id, itemId))
        }
      }
    })

    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error updating workflow:', error)
    return c.json(
      { error: 'Failed to update workflow' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deleteAutomation: AppRouteHandler<DeleteAutomationRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    await db
      .delete(automations)
      .where(and(eq(automations.id, id), eq(automations.userId, user.id)))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error deleting automation:', error)
    return c.json(
      { error: 'Failed to delete automation' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
