import { AuthorizationParams } from '../types'

export function createAuthorizationURL(
  params: AuthorizationParams & {
    authorizationEndpoint: string
    clientId: string
    scopes: string[]
  }
): URL {
  const url = new URL(params.authorizationEndpoint)

  const searchParams = new URLSearchParams({
    client_id: params.clientId,
    redirect_uri: params.redirectURI,
    response_type: 'code',
    state: params.state,
    scope: params.scopes.join(' '),
  })

  url.search = searchParams.toString()
  return url
}
