'use server'

import client from '@/client'
import { headersWithCookies } from '@/lib/header-with-cookies'

export async function fetchMediaFromIds(ids: string[]) {
  const response = await client.media.batch.$post(
    {
      json: { ids },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch media')
  }
  const json = await response.json()
  const media = json.map((m) => ({
    ...m,
    createdAt: new Date(m.createdAt),
    updatedAt: m.updatedAt ? new Date(m.updatedAt) : null,
    deletedAt: m.deletedAt ? new Date(m.deletedAt) : null,
  }))
  return media
}
