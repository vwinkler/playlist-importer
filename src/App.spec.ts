import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import App from './App.vue'
import { server } from './spotify/request_handlers.testutils'

vi.mock('./config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
  },
}))

describe('App', () => {
  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    cleanup()
    server.resetHandlers()
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

    render(App)

    await waitFor(() => {
      expect(screen.getByText('Authenticated')).toBeInTheDocument()
    })
  })
})
