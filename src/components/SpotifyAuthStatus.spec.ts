import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { addHours } from 'date-fns'
import SpotifyAuthStatus from './SpotifyAuthStatus.vue'
import type { SpotifyAuthState } from '../SpotifyAuthState'

describe('SpotifyAuthStatus', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  afterEach(() => {
    // TODO: Investigate why manual cleanup is needed - DOM should be cleaned automatically between tests
    cleanup()
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
})
