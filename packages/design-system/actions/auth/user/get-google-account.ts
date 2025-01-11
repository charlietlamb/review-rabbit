import client from '@rabbit/design-system/lib/client'
import { Account } from '@rabbit/database/schema/auth/accounts'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getGoogleAccount(): Promise<Account | null> {
  const response = await client.user.get['account'][':provider'].$get(
    {
      param: { provider: 'google' },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  if ('error' in data) {
    console.error(data.error)
    return null
  }
  return data
}
