'use server'

import client from '@/client'
import { headersWithCookies } from '@/lib/header-with-cookies'

export async function uploadProfilePicture(form: {
  file: File
}): Promise<number> {
  const fileAsString = encodeArrayBufferToJson(await form.file.arrayBuffer())
  const response = await client.s3.upload['profile-image'].$post(
    {
      json: { file: fileAsString },
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
