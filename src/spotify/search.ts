import { config } from '../config'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

export async function searchTrack(query: string, accessToken: string): Promise<SpotifyResultTrack> {
  const response = await fetch(
    `${config.spotifyWebApiBaseUrl}/v1/search?q=${query}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  const data = await response.json()
  const track = data.tracks.items[0]
  return {
    trackName: track.name,
    uri: track.uri,
  }
}
