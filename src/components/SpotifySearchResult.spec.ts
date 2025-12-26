import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import { MOCK_TRACK_ITEM } from '../spotify/request_handlers.testutils'
import SpotifySearchResult from './SpotifySearchResult.vue'

describe('SpotifySearchResult', () => {
  it('displays track name when provided', () => {
    render(SpotifySearchResult, {
      props: { trackName: MOCK_TRACK_ITEM.name },
    })

    expect(screen.getByText(MOCK_TRACK_ITEM.name)).toBeInTheDocument()
  })
})
