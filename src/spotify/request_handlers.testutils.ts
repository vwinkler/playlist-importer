import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const MOCK_CLIENT_ID = 'test-client-id'
export const MOCK_REDIRECT_URI = 'http://example.com/callback'

export const MOCK_TOKEN_RESPONSE = {
  access_token: 'mocked-access-token',
  token_type: 'Bearer',
  expires_in: 3600,
  scope: 'playlist-modify-public playlist-modify-private',
}

export const handlers = [
  http.post('https://accounts.spotify.com/api/token', async ({ request }) => {
    const contentType = request.headers.get('Content-Type')

    if (contentType !== 'application/x-www-form-urlencoded') {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Invalid content type' },
        { status: 400 },
      )
    }

    const body = await request.text()
    const params = new URLSearchParams(body)

    if (params.get('grant_type') !== 'authorization_code') {
      return HttpResponse.json({ error: 'unsupported_grant_type' }, { status: 400 })
    }

    if (params.get('redirect_uri') !== MOCK_REDIRECT_URI) {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Invalid redirect_uri' },
        { status: 400 },
      )
    }

    if (params.get('client_id') !== MOCK_CLIENT_ID) {
      return HttpResponse.json({ error: 'invalid_client' }, { status: 400 })
    }

    if (!params.get('code') || !params.get('code_verifier')) {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Missing required parameters' },
        { status: 400 },
      )
    }

    return HttpResponse.json(MOCK_TOKEN_RESPONSE)
  }),
]

export const server = setupServer(...handlers)
