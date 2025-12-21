import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { server } from '../spotify/request_handlers.testutils'
import SpotifySearchResult from './SpotifySearchResult.vue'

describe('SpotifySearchResult', () => {
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

  it('shows search result when button is clicked with authenticated state', async () => {
    const accessToken = 'test-access-token'

    render(SpotifySearchResult, {
      props: { accessToken },
    })

    await user.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(
        screen.getByText(
          'Symphony No. 11 in G Minor, Op. 103, "The Year 1905": II. The 9th of January. Allegro - Adagio - Allegro - Adagio',
        ),
      ).toBeInTheDocument()
    })
  })
})
