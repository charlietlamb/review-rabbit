import { HttpStatusCodes } from '@remio/http'
import { db, InvoiceWithClient } from '@remio/database'
import { AppRouteHandler } from '../../lib/types'
import {
  GetInvoicesRoute,
  AddInvoiceRoute,
  UpdateInvoiceRoute,
  DeleteInvoiceRoute,
  GetInvoicesChartRoute,
  GetRecentPaymentsRoute,
} from './invoices.routes'

import { eq, sql, desc, and } from 'drizzle-orm'
import { invoices } from '@remio/database'
import { InvoicesChart } from '@remio/design-system/components/dashboard/payments/invoice-types'

export const getInvoices: AppRouteHandler<GetInvoicesRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit } = await c.req.json()

  try {
    const results = await db.query.invoices.findMany({
      where: eq(invoices.userId, user.id),
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

export const addInvoice: AppRouteHandler<AddInvoiceRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const newInvoice = await c.req.json()

  try {
    await db.insert(invoices).values({ ...newInvoice, userId: user.id })
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

  try {
    const chartData = await db
      .select({
        date: sql<string>`to_char(DATE(${invoices.createdAt}), 'YYYY-MM-DD')`,
        invoices: sql<number>`count(${invoices.id})`,
        amount: sql<number>`sum(CASE WHEN ${invoices.paid} = true THEN ${invoices.amount}::numeric ELSE 0 END)`,
        payments: sql<number>`count(case when ${invoices.paid} = true then 1 end)`,
      })
      .from(invoices)
      .where(eq(invoices.userId, user.id))
      .groupBy(sql`DATE(${invoices.createdAt})`)
      .orderBy(sql`DATE(${invoices.createdAt})`)
      .limit(90)

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

export const getRecentPayments: AppRouteHandler<
  GetRecentPaymentsRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit } = await c.req.json()

  try {
    const results: InvoiceWithClient[] = await db.query.invoices.findMany({
      where: and(eq(invoices.userId, user.id), eq(invoices.paid, true)),
      with: {
        client: true,
      },
      orderBy: desc(invoices.paidAt),
      offset,
      limit,
    })
    return c.json(results, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error fetching recent payments:', error)
    return c.json(
      {
        error: 'Failed to fetch recent payments',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
