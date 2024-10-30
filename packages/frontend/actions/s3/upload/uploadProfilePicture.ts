'use server'

import { HttpStatusCodes } from '@/backend/src/http'
import client from '@/client'
import { cookies } from 'next/headers'

export async function uploadProfilePicture(form: {
  userId: string
  file: File
}): Promise<number> {
  const cookieStore = await cookies()
  const encryptedSession = cookieStore.get('remio.session')?.value
  if (!encryptedSession) return HttpStatusCodes.UNAUTHORIZED
  const response = await client.auth.s3.upload['profile-image'][
    ':userId'
  ].$post({
    param: { userId: form.userId },
    form: {
      file: form.file,
    },
    json: { session: encryptedSession },
  })
  return response.status
}
