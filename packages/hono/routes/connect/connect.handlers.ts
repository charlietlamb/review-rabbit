import { AppRouteHandler } from '@dubble/hono/lib/types'
import { ConnectGetRoute, ConnectPostRoute } from './connect.routes'
import { HttpStatusCodes } from '@dubble/http'
import { providerMap } from '@dubble/hono/connect/providers/provider-map'
import { parseState } from '@dubble/hono/connect/utils/parse-state'
import { OAuth2Tokens, OAuthProvider } from '@dubble/hono/connect/types'
import { env } from '@dubble/env'
import { createNewAccount } from '@dubble/hono/connect/utils/create-new-account'

export const connectGet: AppRouteHandler<ConnectGetRoute> = async (c) => {
  const { code, state } = c.req.query()
  const providerId = c.req.param('providerId')

  if (!code) {
    return c.json({ error: 'No authorization code provided' }, 400)
  }

  const { success, error } = await connectAccount(code, state, providerId)
  if (!success) {
    return c.json(
      { error: error as string },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  return c.json({ success }, HttpStatusCodes.OK)
}

export const connectPost: AppRouteHandler<ConnectPostRoute> = async (c) => {
  const { code, state } = await c.req.parseBody()
  const providerId = c.req.param('providerId')

  const { success, error } = await connectAccount(
    code as string,
    state as string,
    providerId
  )
  if (!success) {
    return c.json(
      { error: error as string },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  return c.json({ success }, HttpStatusCodes.OK)
}

async function connectAccount(code: string, state: string, providerId: string) {
  const provider = providerMap.get(providerId) as OAuthProvider | undefined
  if (!provider) {
    return { success: false, error: 'Provider not found' }
  }

  const parsedState = await parseState(state)
  if (!parsedState) {
    return { success: false, error: 'Invalid state' }
  }

  const { codeVerifier, callbackURL, link, errorURL } = parsedState

  let tokens: OAuth2Tokens
  try {
    tokens = await provider.validateAuthorizationCode({
      code: code,
      codeVerifier,
      redirectURI: `${env.NEXT_PUBLIC_API}/connect/${providerId}`,
    })
  } catch (e) {
    return { success: false, error: 'Invalid authorization code' }
  }
  const userInfo = await provider.getUserInfo(tokens).then((res) => res?.user)
  if (!userInfo || !userInfo.email || !callbackURL || !link?.userId) {
    return { success: false, error: 'Invalid user info' }
  }
  await createNewAccount(link.userId, userInfo.id, providerId)

  return { success: true }
}
