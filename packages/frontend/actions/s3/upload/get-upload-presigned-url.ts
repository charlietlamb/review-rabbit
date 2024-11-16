'use server'

import client from '@/client'
import { headersWithCookies } from '@/lib/header-with-cookies'

export async function getUploadPresignedUrl(fileId: string, extension: string) {
  const response = await client.s3.get['upload-presigned-url'].$post(
    { json: { fileId, extension } },
    await headersWithCookies()
  )
  if (response.status === 200) {
    return (await response.json()).presignedUrl
  }
  return null
}
