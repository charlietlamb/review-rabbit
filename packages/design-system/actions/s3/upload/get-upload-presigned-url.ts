'use server'

import client from '@ff/design-system/lib/client'
import { headersWithCookies } from '@ff/design-system/lib/header-with-cookies'

export async function getUploadPresignedUrl(key: string) {
  const response = await client.s3.get['upload-presigned-url'].$post(
    { json: { key } },
    await headersWithCookies()
  )
  if (response.status === 200) {
    return (await response.json()).presignedUrl
  }
  return null
}
