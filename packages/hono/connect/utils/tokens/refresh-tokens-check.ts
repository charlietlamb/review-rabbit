import { Connect } from '@ff/database/schema/connects'

export function refreshTokensCheck(connection: Connect) {
  return (
    connection.expiresAt &&
    connection.expiresAt <= new Date() &&
    connection.refreshToken
  )
}
