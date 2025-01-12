import { Account } from '@rabbit/database/schema/auth/accounts'

export function isTokenExpired(account: Account): boolean {
  if (!account.accessTokenExpiresAt) return true
  // Add a 5 minute buffer to prevent edge cases
  const expiryWithBuffer = new Date(
    account.accessTokenExpiresAt.getTime() - 5 * 60 * 1000
  )
  return new Date() >= expiryWithBuffer
}
