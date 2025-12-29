import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import {
  server,
  MOCK_TRACK_ITEM,
  MOCK_TRACK_ITEM_2,
  MOCK_TRACK_SEARCH_TERM,
  MOCK_TRACK_2_SEARCH_TERM,
} from '../spotify/request_handlers.testutils'
import SpotifySearch from './SpotifySearch.vue'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('SpotifySearch', () => {
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

  it('displays track name when search button is clicked', async () => {
    const accessToken = 'test-access-token'

    render(SpotifySearch, {
      props: { accessToken },
    })

    await user.type(
      screen.getByRole('textbox'),
      `${MOCK_TRACK_SEARCH_TERM}{Enter}${MOCK_TRACK_2_SEARCH_TERM}`,
    )
    await user.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(screen.getByText(MOCK_TRACK_ITEM.name)).toBeInTheDocument()
      expect(screen.getByText(MOCK_TRACK_ITEM_2.name)).toBeInTheDocument()
    })
  })

  it('does not show create playlist button when no tracks are found', () => {
    const accessToken = 'test-access-token'

    render(SpotifySearch, {
      props: { accessToken },
    })

    expect(screen.queryByRole('button', { name: /create playlist/i })).not.toBeInTheDocument()
  })

  it('shows create playlist button and creates playlist after search', async () => {
    const accessToken = 'test-access-token'

    render(SpotifySearch, {
      props: { accessToken },
    })

    await user.type(screen.getByRole('textbox'), MOCK_TRACK_SEARCH_TERM)
    await user.click(screen.getByRole('button', { name: /search/i }))

    const createPlaylistButton = await screen.findByRole('button', { name: /create playlist/i })
    await user.click(createPlaylistButton)

    await waitFor(() => {
      expect(screen.getByText(/playlist created successfully/i)).toBeInTheDocument()
    })
  })
})
