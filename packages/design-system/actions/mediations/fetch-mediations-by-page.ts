'use server'

import { MediationWithData } from '@remio/database/schema/mediations'
import client from '@remio/design-system/lib/client'
import { PAGE_SIZE } from '@remio/design-system/data/page-size'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function fetchMediationsByPage(
  page: number,
  search?: string
): Promise<MediationWithData[]> {
  const response = await client.mediations['get-by-page'].$post(
    {
      json: {
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        search,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch mediations')
  }
  const mediationsResults = await response.json()

  return mediationsResults.map((mediation) => ({
    ...mediation,
    date: new Date(mediation.date),
    createdAt: new Date(mediation.createdAt),
    updatedAt: new Date(mediation.updatedAt),
    data: mediation.data.map((d) => ({
      ...d,
      client: {
        ...d.client,
        createdAt: new Date(d.client.createdAt),
        updatedAt: new Date(d.client.updatedAt),
      },
      invoice: d.invoice
        ? {
            ...d.invoice,
            createdAt: new Date(d.invoice.createdAt),
            updatedAt: new Date(d.invoice.updatedAt),
            dueDate: new Date(d.invoice.dueDate),
            paidAt: d.invoice.paidAt ? new Date(d.invoice.paidAt) : null,
          }
        : null,
    })),
  }))
}
