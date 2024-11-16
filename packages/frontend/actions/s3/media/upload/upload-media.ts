'use server'

import client from '@/client'
import { headersWithCookies } from '@/lib/header-with-cookies'

export async function uploadMedia(
  files: File[],
  durations: Record<string, number>
): Promise<number> {
  const filesWithData = await Promise.all(
    files.map(async (file) => ({
      name: file.name,
      size: file.size,
      duration: durations[file.name],
      arrayBuffer: encodeArrayBufferToJson(await file.arrayBuffer()),
    }))
  )
  const response = await client.media.upload.$post(
    {
      json: { files: filesWithData },
    },
    await headersWithCookies()
  )
  return response.status
}

function encodeArrayBufferToJson(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer)
  let binaryString = ''

  bytes.forEach((byte) => {
    binaryString += String.fromCharCode(byte)
  })

  return btoa(binaryString)
}
