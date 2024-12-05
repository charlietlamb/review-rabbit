'use server'

import client from '@remio/design-system/lib/client'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function getPresignedUrl(key: string) {
  try {
    const response = await client.s3.get['presigned-url'].$post(
      {
        json: { key },
      },
      await headersWithCookies()
    )
    if (response.status !== 200) {
      console.error('Failed to get presigned URL:', response.statusText)
      return null
    }

    const json = await response.json()
    return json.presignedUrl
  } catch (error) {
    console.error('Error fetching presigned URL:', error)
    return null
  }
}
