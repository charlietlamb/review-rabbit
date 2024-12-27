'use server'

import { InvoiceWithClient } from '@remio/database/schema/invoices'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'

export async function getInvoiceById(id: string): Promise<InvoiceWithClient> {
  const response = await client.invoices['get-by-id'].$post(
    {
      json: {
        id,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch invoice')
  }
  const invoiceResponse = await response.json()

  return {
    ...invoiceResponse,
    createdAt: new Date(invoiceResponse.createdAt),
    updatedAt: new Date(invoiceResponse.updatedAt),
    dueDate: new Date(invoiceResponse.dueDate),
    paidAt: invoiceResponse.paidAt ? new Date(invoiceResponse.paidAt) : null,
    client: {
      ...invoiceResponse.client,
      createdAt: new Date(invoiceResponse.client.createdAt),
      updatedAt: new Date(invoiceResponse.client.updatedAt),
    },
  }
}
