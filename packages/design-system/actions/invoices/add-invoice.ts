'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'
import { InvoiceFormData } from '@remio/design-system/components/dashboard/invoices/invoice-schema'

export async function addInvoice(
  newInvoice: InvoiceFormData
): Promise<boolean> {
  const response = await client.invoices.add.$post(
    {
      json: newInvoice,
    },
    await headersWithCookies()
  )
  if (!response.ok)
    console.error(
      'Failed to add invoice: ',
      response.statusText,
      response.status
    )
  return response.ok
}
