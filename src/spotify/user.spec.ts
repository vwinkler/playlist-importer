import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { getUserId } from './user'
import { server, MOCK_USER_ID } from './request_handlers.testutils'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('user', () => {
  describe('getUserId', () => {
    beforeEach(() => {
      server.listen()
    })

    afterEach(() => {
      server.resetHandlers()
    })

    afterAll(() => {
      server.close()
    })

    it('should retrieve the user id', async () => {
      const accessToken = 'test-access-token'

      const result = await getUserId(accessToken)

      expect(result).toBe(MOCK_USER_ID)
    })
  })
})
