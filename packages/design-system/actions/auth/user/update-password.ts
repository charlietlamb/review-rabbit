'use server'

import { authClient } from '@burse/design-system/lib/authClient'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function updatePassword(
  currentPassword: string,
  newPassword: string
) {
  try {
    const res = await authClient.changePassword(
      {
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      },
      await headersWithCookies()
    )
    return res.error ? false : true
  } catch (error) {
    return false
  }
}
