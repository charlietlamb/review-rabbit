import { env } from '@burse/env'
import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, oneTapClient } from 'better-auth/client/plugins'
import { auth } from '@burse/auth'

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
  ],
})
