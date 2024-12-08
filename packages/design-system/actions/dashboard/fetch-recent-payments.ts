'use server'

import { InvoiceWithClient } from '@remio/database/schema/invoices'
import client from '@remio/design-system/lib/client'
import { PAGE_SIZE } from '@remio/design-system/data/page-size'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function fetchRecentPayments(
  page: number
): Promise<InvoiceWithClient[]> {
  const response = await client.invoices.payments.$post(
    {
      json: { offset: page * PAGE_SIZE, limit: PAGE_SIZE },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch recent payments')
  }
  const paymentsResults = await response.json()

  return paymentsResults.map((payment) => ({
    ...payment,
    createdAt: new Date(payment.createdAt),
    updatedAt: new Date(payment.updatedAt),
    dueDate: new Date(payment.dueDate),
    issueDate: new Date(payment.issueDate),
    paidAt: payment.paidAt ? new Date(payment.paidAt) : null,
  }))
}
