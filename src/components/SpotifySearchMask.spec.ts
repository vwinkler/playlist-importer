import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import {
  server,
  MOCK_CLIENT_ID,
  MOCK_REDIRECT_URI,
  MOCK_TRACK_ITEM,
  MOCK_TRACK_SEARCH_TERM,
  MOCK_TRACK_ITEM_2,
  MOCK_TRACK_2_SEARCH_TERM,
} from '../spotify/request_handlers.testutils'
import SpotifySearchMask from './SpotifySearchMask.vue'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: MOCK_CLIENT_ID,
    spotifyRedirectUri: MOCK_REDIRECT_URI,
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('SpotifySearchMask', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    server.listen()
  })

  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('emits SpotifySearchResult when user enters search query and clicks button', async () => {
    const accessToken = 'test-access-token'

    const { emitted } = render(SpotifySearchMask, {
      props: { accessToken },
    })

    await user.type(screen.getByRole('textbox'), MOCK_TRACK_SEARCH_TERM)
    await user.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(emitted()).toHaveProperty('result')
      expect(emitted().result[0]).toEqual([
        [{ trackName: MOCK_TRACK_ITEM.name, uri: MOCK_TRACK_ITEM.uri }],
      ])
    })
  })

  it('emits multiple SpotifyResultTracks when user enters multiple search queries (one per line)', async () => {
    const accessToken = 'test-access-token'

    const { emitted } = render(SpotifySearchMask, {
      props: { accessToken },
    })

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, MOCK_TRACK_SEARCH_TERM)
    await user.type(textarea, '{Enter}')
    await user.type(textarea, MOCK_TRACK_2_SEARCH_TERM)
    await user.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(emitted()).toHaveProperty('result')
      expect(emitted().result[0]).toEqual([
        [
          { trackName: MOCK_TRACK_ITEM.name, uri: MOCK_TRACK_ITEM.uri },
          { trackName: MOCK_TRACK_ITEM_2.name, uri: MOCK_TRACK_ITEM_2.uri },
        ],
      ])
    })
  })
})
