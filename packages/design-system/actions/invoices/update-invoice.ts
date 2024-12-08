'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'
import { InvoiceFormData } from '@remio/design-system/components/dashboard/payments/invoice-schema'

export async function updateInvoice(
  newInvoice: InvoiceFormData,
  id: string
): Promise<boolean> {
  const response = await client.invoices.update.$post(
    { json: { ...newInvoice, id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to update invoice')
  }
  return response.ok
}
