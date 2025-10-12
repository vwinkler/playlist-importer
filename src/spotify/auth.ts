import { config } from '../config'
import type { SpotifyAuthState } from '../SpotifyAuthState'

export function redirectForAuthorization(codeChallenge: string): void {
  const url = new URL('https://accounts.spotify.com/authorize')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.spotifyClientId,
    scope: 'playlist-modify-public playlist-modify-private',
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: config.spotifyRedirectUri,
  })

  url.search = params.toString()
  window.location.replace(url.toString())
}

export type AuthorizationResponse = {
  code: string
}

export function extractAuthorizationResponse(): AuthorizationResponse | null {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (!code) {
    return null
  }
  
  return { code }
}

export async function exchangeCodeForToken(
  authResponse: AuthorizationResponse,
  codeVerifier: string
): Promise<SpotifyAuthState> {
  const request = buildTokenExchangeRequest(authResponse, codeVerifier)
  const tokenData = await requestToken(request)
  
  return createAuthState(tokenData)
}

function buildTokenExchangeRequest(
  authResponse: AuthorizationResponse,
  codeVerifier: string
): { url: string; options: RequestInit } {
  return {
    url: 'https://accounts.spotify.com/api/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authResponse.code,
        redirect_uri: config.spotifyRedirectUri,
        client_id: config.spotifyClientId,
        code_verifier: codeVerifier,
      }).toString(),
    }
  }
}

async function requestToken(request: { url: string; options: RequestInit }): Promise<{ access_token: string; expires_in: number }> {
  const response = await fetch(request.url, request.options)
  ensureHttpResponseOk(response)
  const tokenData = await response.json()
  ensureTokenDataValid(tokenData)
  return tokenData
}

function ensureHttpResponseOk(response: Response): void {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}

function ensureTokenDataValid(tokenData: any): void {
  if (!tokenData.access_token || !tokenData.expires_in) {
    throw new Error('Invalid token response: missing required fields')
  }
}

function createAuthState(tokenData: { access_token: string; expires_in: number }): SpotifyAuthState {
  return {
    isAuthenticated: true,
    accessToken: tokenData.access_token,
    expiresAt: new Date(Date.now() + tokenData.expires_in * 1000)
  }
}
