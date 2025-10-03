import { describe, it, expect, vi, beforeEach } from 'vitest'
import { redirectForAuthorization } from './auth'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'mocked-client-id',
  },
}))

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
      '&client_id=mocked-client-id',
      '&scope=playlist-modify-public+playlist-modify-private',
      '&code_challenge_method=S256',
      '&code_challenge=test-code-challenge',
      '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback',
    ].join('')

    expect(window.location.replace).toHaveBeenCalledWith(expectedUrl)
  })
})
