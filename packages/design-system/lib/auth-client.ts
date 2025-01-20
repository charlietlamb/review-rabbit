import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, oneTapClient } from 'better-auth/client/plugins'
import { getAuth } from '@rabbit/auth'
import { env } from '@rabbit/env'

let authClient: ReturnType<typeof createAuthClient> | null = null

export function getAuthClient() {
  const auth = getAuth(env)
  if (!authClient) {
    authClient = createAuthClient({
      baseURL: env.NEXT_PUBLIC_API,
      plugins: [
        inferAdditionalFields<typeof auth>(),
        oneTapClient({
          clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        }),
      ],
    })
  }
  return authClient
}
