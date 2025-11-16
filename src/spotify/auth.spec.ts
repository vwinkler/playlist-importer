import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import {
  redirectForAuthorization,
  extractAuthorizationResponse,
  exchangeCodeForToken,
} from './auth'
import {
  server,
  MOCK_TOKEN_RESPONSE,
  MOCK_CLIENT_ID,
  MOCK_REDIRECT_URI,
} from './request_handlers.testutils'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
  },
}))

describe('auth', () => {
  describe('redirectForAuthorization', () => {
    beforeEach(() => {
      vi.stubGlobal('location', {
        replace: vi.fn(),
      })
    })

    it('should redirect to Spotify authorization URL with correct parameters', () => {
      const codeChallenge = 'test-code-challenge'

      redirectForAuthorization(codeChallenge)

      const expectedUrl = [
        'https://accounts.spotify.com/authorize',
        '?response_type=code',
        '&client_id=test-client-id',
        '&scope=playlist-modify-public+playlist-modify-private',
        '&code_challenge_method=S256',
        '&code_challenge=test-code-challenge',
        '&redirect_uri=http%3A%2F%2Fexample.com%2Fcallback',
      ].join('')

      expect(window.location.replace).toHaveBeenCalledWith(expectedUrl)
    })
  })

  describe('extractAuthorizationResponse', () => {
    it('should extract authorization response from URL search params', () => {
      vi.stubGlobal('location', {
        search: '?code=AQBh7-6F8xKjQw',
      })

      const response = extractAuthorizationResponse()

      expect(response?.code).toBe('AQBh7-6F8xKjQw')
    })
  })

  describe('exchangeCodeForToken', () => {
    beforeEach(() => {
      server.listen()
    })

    afterEach(() => {
      server.resetHandlers()
      vi.useRealTimers()
    })

    afterAll(() => {
      server.close()
    })

    it('should exchange authorization code for access token', async () => {
      const authResponse = { code: 'test-auth-code' }
      const codeVerifier = 'test-code-verifier'

      const result = await exchangeCodeForToken(authResponse, codeVerifier)

      expect(result.isAuthenticated).toBe(true)
      expect(result.accessToken).toBe(MOCK_TOKEN_RESPONSE.access_token)
    })

    it('should calculate correct expiration time from expires_in', async () => {
      const fixedTime = new Date('2024-01-01T12:00:00Z')
      vi.useFakeTimers()
      vi.setSystemTime(fixedTime)
      const authResponse = { code: 'test-auth-code' }
      const codeVerifier = 'test-code-verifier'

      const result = await exchangeCodeForToken(authResponse, codeVerifier)

      expect(result.expiresAt).toEqual(new Date('2024-01-01T13:00:00Z'))
    })

    it('should throw error when HTTP request fails', async () => {
      server.use(
        http.post('https://accounts.spotify.com/api/token', () => {
          return HttpResponse.json({ error: 'server_error' }, { status: 500 })
        }),
      )

      const authResponse = { code: 'test-auth-code' }
      const codeVerifier = 'test-code-verifier'

      await expect(exchangeCodeForToken(authResponse, codeVerifier)).rejects.toThrow()
    })

    it('should throw error when response is missing required fields', async () => {
      server.use(
        http.post('https://accounts.spotify.com/api/token', () => {
          return HttpResponse.json({ some_other_field: 'value' }, { status: 200 })
        }),
      )

      const authResponse = { code: 'test-auth-code' }
      const codeVerifier = 'test-code-verifier'

      await expect(exchangeCodeForToken(authResponse, codeVerifier)).rejects.toThrow()
    })
  })
})
