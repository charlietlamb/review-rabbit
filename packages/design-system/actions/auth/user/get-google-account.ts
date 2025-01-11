import client from '@rabbit/design-system/lib/client'
import { Account } from '@rabbit/database/schema/auth/accounts'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export async function getGoogleAccount(): Promise<Account | null> {
  const response = await client.account.get[':provider'].$get(
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
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    accessTokenExpiresAt: data.accessTokenExpiresAt
      ? new Date(data.accessTokenExpiresAt)
      : null,
    refreshTokenExpiresAt: data.refreshTokenExpiresAt
      ? new Date(data.refreshTokenExpiresAt)
      : null,
    expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
  }
}
