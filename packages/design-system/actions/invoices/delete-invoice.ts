'use server'

import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import client from '@remio/design-system/lib/client'

export async function deleteInvoice(id: string): Promise<boolean> {
  const response = await client.invoices.delete.$post(
    { json: { id } },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to delete invoice')
  }
  return response.ok
}
