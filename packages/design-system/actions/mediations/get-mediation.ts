'use server'

import client from '@remio/design-system/lib/client'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import { MediationWithData } from '@remio/database/schema/mediations'

export async function fetchMediations(id: string): Promise<MediationWithData> {
  const response = await client.mediations['get-by-id'].$post(
    {
      json: {
        id,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch mediations')
  }
  const mediationResult = await response.json()

  return {
    ...mediationResult,
    date: new Date(mediationResult.date),
    createdAt: new Date(mediationResult.createdAt),
    updatedAt: new Date(mediationResult.updatedAt),
    data: mediationResult.data.map((data) => ({
      ...data,
      client: {
        ...data.client,
        createdAt: new Date(data.client.createdAt),
        updatedAt: new Date(data.client.updatedAt),
      },
      invoice: data.invoice
        ? {
            ...data.invoice,
            createdAt: new Date(data.invoice.createdAt),
            updatedAt: new Date(data.invoice.updatedAt),
            dueDate: new Date(data.invoice.dueDate),
            paidAt: data.invoice.paidAt ? new Date(data.invoice.paidAt) : null,
          }
        : null,
    })),
  }
}
