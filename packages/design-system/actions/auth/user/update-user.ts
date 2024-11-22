'use server'

import client from '@dubble/design-system/lib/client'
import { headersWithCookies } from '@dubble/design-system/lib/header-with-cookies'

export async function updateUser(form: {
  name: string
  email: string
  image?: string
}): Promise<number> {
  const response = await client.user.update.$post(
    {
      json: { form },
    },
    await headersWithCookies()
  )
  return response.status
}
