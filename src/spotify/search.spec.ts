import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { searchTrack } from './search'
import { server, MOCK_TRACK_ITEM, MOCK_TRACK_SEARCH_TERM } from './request_handlers.testutils'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('search', () => {
  describe('searchTrack', () => {
    beforeEach(() => {
      server.listen()
    })

    afterEach(() => {
      server.resetHandlers()
    })

    afterAll(() => {
      server.close()
    })

    it('should search for a track and return SpotifyResultTrack', async () => {
      const accessToken = 'test-access-token'
      const query = MOCK_TRACK_SEARCH_TERM

      const result = await searchTrack(query, accessToken)

      expect(result).toEqual({ trackName: MOCK_TRACK_ITEM.name })
    })
  })
})
