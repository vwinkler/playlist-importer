import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { createPlaylist, addTracksToPlaylist, type PlaylistCreationData } from './playlist'
import { server, MOCK_PLAYLIST_RESPONSE, MOCK_USER_ID } from './request_handlers.testutils'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

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

  describe('addTracksToPlaylist', () => {
    beforeEach(() => {
      server.listen()
    })

    afterEach(() => {
      server.resetHandlers()
    })

    afterAll(() => {
      server.close()
    })

    it('should add tracks to a playlist', async () => {
      const accessToken = 'test-access-token'
      const playlistId = MOCK_PLAYLIST_RESPONSE.id
      const tracks: SpotifyResultTrack[] = [
        { trackName: 'Track 1', uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' },
        { trackName: 'Track 2', uri: 'spotify:track:1301WleyT98MSxVHPZCA6M' },
      ]

      await expect(addTracksToPlaylist(playlistId, tracks, accessToken)).resolves.toBeUndefined()
    })

    it('should throw error when trying to add more than 100 tracks', async () => {
      const accessToken = 'test-access-token'
      const playlistId = MOCK_PLAYLIST_RESPONSE.id
      const tracks: SpotifyResultTrack[] = Array.from({ length: 101 }, (_, i) => ({
        trackName: `Track ${i}`,
        uri: `spotify:track:${i}`,
      }))

      await expect(addTracksToPlaylist(playlistId, tracks, accessToken)).rejects.toThrow(
        'Cannot add more than 100 tracks at once',
      )
    })
  })
})
