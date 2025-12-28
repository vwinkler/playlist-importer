import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import { MOCK_TRACK_ITEM } from '../spotify/request_handlers.testutils'
import SpotifyResultTrackView from './SpotifyResultTrackView.vue'

describe('SpotifyResultTrackView', () => {
  it('displays track name when provided', () => {
    render(SpotifyResultTrackView, {
      props: { result: { trackName: MOCK_TRACK_ITEM.name, uri: MOCK_TRACK_ITEM.uri } },
    })

    expect(screen.getByText(MOCK_TRACK_ITEM.name)).toBeInTheDocument()
  })
})
