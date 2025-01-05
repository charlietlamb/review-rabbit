import { HttpStatusCodes } from '@rabbit/http'
import { db, workflows, workflowItems } from '@rabbit/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetWorkflowsRoute,
  CreateWorkflowRoute,
  UpdateWorkflowRoute,
  DeleteWorkflowRoute,
  GetWorkflowByIdRoute,
} from './workflows.routes'
import { eq, sql, and, or } from 'drizzle-orm'
import type { WorkflowForm } from '@rabbit/database/types/workflow-types'
import { v4 as uuidv4 } from 'uuid'

export const getWorkflows: AppRouteHandler<GetWorkflowsRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, search } = await c.req.json()

  try {
    const results = await db.query.workflows.findMany({
      where: and(
        eq(workflows.userId, user.id),
        or(sql`LOWER(${workflows.title}) LIKE ${`%${search?.toLowerCase()}%`}`)
      ),
      offset,
      limit,
      orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
      with: {
        items: true,
      },
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching workflows:', error)
    return c.json(
      { error: 'Failed to fetch workflows' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getWorkflowById: AppRouteHandler<GetWorkflowByIdRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    const workflow = await db.query.workflows.findFirst({
      where: and(eq(workflows.id, id), eq(workflows.userId, user.id)),
      with: {
        items: true,
      },
    })
    if (!workflow) {
      return c.json({ error: 'Client not found' }, HttpStatusCodes.NOT_FOUND)
    }
    return c.json(workflow, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching workflow:', error)
    return c.json(
      { error: 'Failed to fetch workflow' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const createWorkflow: AppRouteHandler<CreateWorkflowRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { items, ...workflowData } = await c.req.valid('json')
  const workflowId = uuidv4()

  try {
    await db.transaction(async (tx) => {
      await tx.insert(workflows).values({
        ...workflowData,
        id: workflowId,
        userId: user.id,
      })

      if (items && items.length > 0) {
        await tx.insert(workflowItems).values(
          items.map((item) => ({
            id: item.id || uuidv4(),
            workflowId,
            content: item.content,
            type: item.type,
            x: item.x,
            y: item.y,
            time: item.time,
            level: item.level,
          }))
        )
      }
    })

    return c.json(workflowId, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error adding workflow:', error)
    return c.json(
      { error: 'Failed to add workflow' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const updateWorkflow: AppRouteHandler<UpdateWorkflowRoute> = async (
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
      // Update workflow with correct title field and updatedAt
      await tx
        .update(workflows)
        .set({
          title: workflowData.title,
          updatedAt: new Date(),
        })
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

      // Update existing items with all required fields including level
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
              level: itemData.level,
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

export const deleteWorkflow: AppRouteHandler<DeleteWorkflowRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    await db
      .delete(workflows)
      .where(and(eq(workflows.id, id), eq(workflows.userId, user.id)))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error deleting workflow:', error)
    return c.json(
      { error: 'Failed to delete workflow' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
