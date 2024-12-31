import { getEnv } from '@rabbit/env'
import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, oneTapClient } from 'better-auth/client/plugins'
import { auth } from '@rabbit/auth'

export const authClient = createAuthClient({
  baseURL: getEnv().NEXT_PUBLIC_API,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    oneTapClient({
      clientId: getEnv().NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
  ],
})
