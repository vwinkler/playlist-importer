import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import PlaylistCreator from './PlaylistCreator.vue'
import { server } from '../spotify/request_handlers.testutils'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://localhost:5173/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('PlaylistCreator', () => {
  const mockTracks: SpotifyResultTrack[] = [
    { trackName: 'Track 1', uri: 'spotify:track:1' },
    { trackName: 'Track 2', uri: 'spotify:track:2' },
    { trackName: 'Track 3', uri: 'spotify:track:3' },
  ]

  const mockAccessToken = 'test-access-token'

  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    vi.clearAllMocks()
  })

  afterAll(() => {
    server.close()
  })

  it('should create playlist and add tracks when button is clicked', async () => {
    const user = userEvent.setup()

    render(PlaylistCreator, {
      props: {
        tracks: mockTracks,
        accessToken: mockAccessToken,
      },
    })

    const button = screen.getByRole('button', { name: /create playlist/i })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/playlist created successfully/i)).toBeInTheDocument()
    })
  })
})
