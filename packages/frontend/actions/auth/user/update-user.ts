'use server'

import client from '@/client'
import { headersWithCookies } from '@/lib/header-with-cookies'
import { headers } from 'next/headers'

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
