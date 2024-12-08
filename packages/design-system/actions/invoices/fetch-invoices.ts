'use server'

import { Invoice } from '@remio/database/schema/invoices'
import client from '@remio/design-system/lib/client'
import { PAGE_SIZE } from '@remio/design-system/data/page-size'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function fetchInvoices(page: number): Promise<Invoice[]> {
  const response = await client.invoices.$post(
    {
      json: { offset: page * PAGE_SIZE, limit: PAGE_SIZE },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch invoices')
  }
  const invoicesResults = await response.json()

  return invoicesResults.map((invoice) => ({
    ...invoice,
    createdAt: new Date(invoice.createdAt),
    updatedAt: new Date(invoice.updatedAt),
    dueDate: new Date(invoice.dueDate),
    issueDate: new Date(invoice.issueDate),
    paidAt: invoice.paidAt ? new Date(invoice.paidAt) : null,
  }))
}
