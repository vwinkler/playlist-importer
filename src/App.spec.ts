import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import App from './App.vue'
import { server, MOCK_TRACK_ITEM } from './spotify/request_handlers.testutils'

vi.mock('./config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
    spotifyWebApiBaseUrl: 'https://api.spotify.com',
  },
}))

describe('App', () => {
  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    cleanup()
    server.resetHandlers()
    sessionStorage.clear()
  })

  afterAll(() => {
    server.close()
  })

  it('initially shows user is not authenticated', () => {
    render(App)
    expect(screen.getByText('Not authenticated')).toBeInTheDocument()
  })

  it('updates auth state when SpotifyAuthStatus emits auth-state-changed', async () => {
    vi.stubGlobal('location', {
      search: '?code=test-auth-code',
      replace: vi.fn(),
    })

    sessionStorage.setItem('code_verifier', 'test-verifier')

    render(App)

    await waitFor(() => {
      expect(screen.getByText('Authenticated')).toBeInTheDocument()
    })
  })

  it('displays track name when search button is clicked in authenticated state', async () => {
    vi.stubGlobal('location', {
      search: '?code=test-auth-code',
      replace: vi.fn(),
    })

    sessionStorage.setItem('code_verifier', 'test-verifier')

    const user = userEvent.setup()
    render(App)

    const searchButton = await screen.findByRole('button', { name: /search/i })
    await user.click(searchButton)

    await waitFor(() => {
      expect(screen.getByText(MOCK_TRACK_ITEM.name)).toBeInTheDocument()
    })
  })

  // TODO: Replace this test with a full integration test that does not rely on sessionStorage implementation details:
  // 1. Click login button to initiate authentication
  // 2. Mock the redirect from Spotify with authorization code
  // 3. Wait for token exchange to complete
  // 4. Verify "Authenticated" label appears
})
