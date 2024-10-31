import client from '@/client'

export async function uploadProfilePicture(form: {
  file: File
  jwt: string
}): Promise<number> {
  const fileAsString = encodeArrayBufferToJson(await form.file.arrayBuffer())
  const response = await client.auth.s3.upload['profile-image'].$post({
    json: { session: form.jwt, file: fileAsString },
  })
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
