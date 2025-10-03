import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import { addHours } from 'date-fns'
import SpotifyAuthStatus from './SpotifyAuthStatus.vue'
import type { SpotifyAuthState } from '../SpotifyAuthState'

describe('SpotifyAuthStatus', () => {
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
})
