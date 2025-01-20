import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, oneTapClient } from 'better-auth/client/plugins'
import { env } from '@rabbit/env'
import { getAuth } from '@rabbit/auth'

const auth = getAuth(env)

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
  ],
})
