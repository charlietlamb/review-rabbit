import { Account } from '@rabbit/database'
import { GOOGLE_BUSINESS_SCOPE } from '../data'

export function hasBusinessScope(account: Account): boolean {
  if (!account.scope) return false
  return account.scope.split(',').includes(GOOGLE_BUSINESS_SCOPE)
}
