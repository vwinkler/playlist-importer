import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { createPlaylist, type PlaylistCreationData } from './playlist'
import { server, MOCK_PLAYLIST_RESPONSE, MOCK_USER_ID } from './request_handlers.testutils'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('playlist', () => {
  describe('createPlaylist', () => {
    beforeEach(() => {
      server.listen()
    })

    afterEach(() => {
      server.resetHandlers()
    })

    afterAll(() => {
      server.close()
    })

    it('should create a playlist', async () => {
      const accessToken = 'test-access-token'
      const playlistData: PlaylistCreationData = {
        name: 'New Playlist',
        description: 'New playlist description',
      }

      const result = await createPlaylist(MOCK_USER_ID, playlistData, accessToken)

      expect(result).toEqual({ id: MOCK_PLAYLIST_RESPONSE.id })
    })
  })
})
