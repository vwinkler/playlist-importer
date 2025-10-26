import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { addHours } from 'date-fns'
import { server } from '../spotify/request_handlers.testutils'
import SpotifyAuthStatus from './SpotifyAuthStatus.vue'
import type { SpotifyAuthState } from '../SpotifyAuthState'

vi.mock('../config', () => ({
  config: {
    spotifyClientId: 'test-client-id',
    spotifyRedirectUri: 'http://example.com/callback',
    spotifyApiBaseUrl: 'https://accounts.spotify.com/api',
  },
}))

describe('SpotifyAuthStatus', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    server.listen()
  })

  afterEach(() => {
    // TODO: Investigate why manual cleanup is needed - DOM should be cleaned automatically between tests
    cleanup()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
  it('shows not authenticated when isAuthenticated is false', () => {
    const authState: SpotifyAuthState = {
      isAuthenticated: false,
      accessToken: undefined,
      expiresAt: undefined
    }

    render(SpotifyAuthStatus, {
      props: { authState }
    })

    expect(screen.getByText('Not authenticated')).toBeInTheDocument()
  })

  it('shows authenticated when isAuthenticated is true', () => {
    const authState: SpotifyAuthState = {
      isAuthenticated: true,
      accessToken: 'test-token',
      expiresAt: addHours(new Date(), 1)
    }

    render(SpotifyAuthStatus, {
      props: { authState }
    })

    expect(screen.getByText('Authenticated')).toBeInTheDocument()
  })

  it('redirects to Spotify when login button is clicked', async () => {
    vi.stubGlobal('location', {
      replace: vi.fn(),
    })

    const authState: SpotifyAuthState = {
      isAuthenticated: false,
      accessToken: undefined,
      expiresAt: undefined
    }

    render(SpotifyAuthStatus, {
      props: { authState }
    })

    await user.click(screen.getByRole('button', { name: /login with spotify/i }))

    expect(window.location.replace).toHaveBeenCalledWith(
      expect.stringContaining('https://accounts.spotify.com/authorize')
    )
  })

  it('shows authentication in progress when code parameter is present', () => {
    // Mock URL with code parameter
    vi.stubGlobal('location', {
      search: '?code=test-auth-code',
      replace: vi.fn(),
    })

    const authState: SpotifyAuthState = {
      isAuthenticated: false,
      accessToken: undefined,
      expiresAt: undefined
    }

    render(SpotifyAuthStatus, {
      props: { authState }
    })

    expect(screen.getByText('Authentication in progress...')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /login with spotify/i })).not.toBeInTheDocument()
  })

  it('emits updated auth state when code parameter is present', async () => {
    vi.stubGlobal('location', {
      search: '?code=test-auth-code',
      replace: vi.fn(),
    })

    const authState: SpotifyAuthState = {
      isAuthenticated: false,
      accessToken: undefined,
      expiresAt: undefined
    }

    const { emitted } = render(SpotifyAuthStatus, {
      props: { authState }
    })

    await waitFor(() => {
      const authStateChangedEvent = emitted()['auth-state-changed']
      expect(authStateChangedEvent[0]).toEqual([{
        isAuthenticated: true,
        accessToken: 'mocked-access-token',
        expiresAt: expect.any(Date)
      }])
    })
  })
})
