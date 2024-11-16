'use server'

import client from '@/client'
import { headersWithCookies } from '@/lib/header-with-cookies'

export async function storeMedia(
  file: File,
  fileId: string,
  extension: string,
  duration: number
) {
  const response = await client.media.store.$post(
    {
      json: {
        path: fileId,
        name: file.name,
        size: file.size,
        extension,
        duration:
          Math.ceil(duration) === duration ? duration : Math.ceil(duration),
        source: 'user',
      },
    },
    await headersWithCookies()
  )
  return response.status
}
