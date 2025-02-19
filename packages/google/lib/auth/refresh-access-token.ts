import { OAuth2Client } from 'google-auth-library'
import { Account } from '@rabbit/database'
import { getDb } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { accounts } from '@rabbit/database/schema/auth/accounts'
import { EnvType } from '@rabbit/env'

export async function refreshAccessToken(
  account: Account,
  env: EnvType
): Promise<Account> {
  const db = getDb(env)
  if (!account.refreshToken) {
    throw new Error('No refresh token available')
  }

  const oauth2Client = new OAuth2Client(
    env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    `${env.NEXT_PUBLIC_API}/business/callback/success`
  )

  oauth2Client.setCredentials({
    refresh_token: account.refreshToken,
  })

  try {
    const { credentials } = await oauth2Client.refreshAccessToken()

    // Update the account in the database with new tokens
    const updatedAccount = await db
      .update(accounts)
      .set({
        accessToken: credentials.access_token,
        accessTokenExpiresAt: credentials.expiry_date
          ? new Date(credentials.expiry_date)
          : null,
        refreshToken: credentials.refresh_token || account.refreshToken, // Keep old refresh token if new one not provided
      })
      .where(eq(accounts.id, account.id))
      .returning()

    return updatedAccount[0]
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw new Error('Failed to refresh access token')
  }
}
