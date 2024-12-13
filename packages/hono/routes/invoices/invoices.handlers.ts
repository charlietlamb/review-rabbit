import { HttpStatusCodes } from '@remio/http'
import { db, InvoiceWithClient } from '@remio/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetInvoicesRoute,
  AddInvoiceRoute,
  UpdateInvoiceRoute,
  DeleteInvoiceRoute,
  GetInvoicesChartRoute,
  GetInvoicesWithClientRoute,
} from './invoices.routes'

import { eq, sql, and } from 'drizzle-orm'
import { invoices } from '@remio/database'

export const getInvoices: AppRouteHandler<GetInvoicesRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, paid } = await c.req.json()

  try {
    const whereConditions = [eq(invoices.userId, user.id)]
    if (typeof paid === 'boolean') {
      whereConditions.push(eq(invoices.paid, paid))
    }

    const results = await db.query.invoices.findMany({
      where: and(...whereConditions),
      offset,
      limit,
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return c.json(
      {
        error: 'Failed to fetch invoices',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getInvoicesWithClient: AppRouteHandler<
  GetInvoicesWithClientRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit, paid } = await c.req.json()

  try {
    const whereConditions = [eq(invoices.userId, user.id)]
    if (typeof paid === 'boolean') {
      whereConditions.push(eq(invoices.paid, paid))
    }

    const results = await db.query.invoices.findMany({
      where: and(...whereConditions),
      offset,
      limit,
      with: {
        client: true,
      },
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return c.json(
      {
        error: 'Failed to fetch invoices',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const addInvoice: AppRouteHandler<AddInvoiceRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const newInvoice = await c.req.json()
  console.log(newInvoice)
  try {
    await db.insert(invoices).values({
      ...newInvoice,
      dueDate: new Date(newInvoice.dueDate),
      userId: user.id,
    })
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error adding invoice:', error)
    return c.json(
      { error: 'Failed to add invoice' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const updateInvoice: AppRouteHandler<UpdateInvoiceRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const invoice = await c.req.json()
  try {
    await db.update(invoices).set(invoice).where(eq(invoices.id, invoice.id))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error updating invoice:', error)
    return c.json(
      { error: 'Failed to update invoice' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deleteInvoice: AppRouteHandler<DeleteInvoiceRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.json()
  try {
    await db.delete(invoices).where(eq(invoices.id, id))
    return c.json(true, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return c.json(
      { error: 'Failed to delete invoice' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getInvoicesChart: AppRouteHandler<GetInvoicesChartRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { startDate, endDate } = await c.req.valid('json')
  console.log(startDate, endDate)
  try {
    const chartData = await db
      .select({
        date: sql<string>`to_char(DATE(${invoices.createdAt}), 'YYYY-MM-DD')`,
        amount: sql<number>`COALESCE(sum(CASE WHEN ${invoices.paid} = true THEN ${invoices.amount} ELSE 0 END), 0)`,
      })
      .from(invoices)
      .where(
        and(
          eq(invoices.userId, user.id),
          eq(invoices.paid, true),
          sql`DATE(${invoices.createdAt}) >= DATE(${startDate})`,
          sql`DATE(${invoices.createdAt}) <= DATE(${endDate})`
        )
      )
      .groupBy(sql`DATE(${invoices.createdAt})`)
      .orderBy(sql`DATE(${invoices.createdAt})`)

    if (!chartData || chartData.length === 0) {
      return c.json([], HttpStatusCodes.OK)
    }

    return c.json(chartData, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching invoices chart:', error)
    return c.json(
      {
        error: 'Failed to fetch invoices chart',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
