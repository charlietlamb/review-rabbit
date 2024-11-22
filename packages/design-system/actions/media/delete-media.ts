'use server'

import client from '@dubble/design-system/lib/client'
import { headersWithCookies } from '@dubble/design-system/lib/header-with-cookies'

export async function deleteMedia(path: string, id: string): Promise<number> {
  const response = await client.s3.media.delete.$post(
    {
      json: { path, id },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to delete media')
  }
  return response.status
}
