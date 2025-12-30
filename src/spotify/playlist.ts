import { config } from '../config'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

export interface PlaylistCreationData {
  name: string
  description?: string
}

export interface PlaylistCreationResult {
  id: string
}

export async function createPlaylist(
  userId: string,
  playlistData: PlaylistCreationData,
  accessToken: string,
): Promise<PlaylistCreationResult> {
  const response = await fetch(`${config.spotifyWebApiBaseUrl}/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...playlistData,
      public: false,
    }),
  })

  const data = await response.json()
  return { id: data.id }
}

export async function addTracksToPlaylist(
  playlistId: string,
  tracks: SpotifyResultTrack[],
  accessToken: string,
): Promise<void> {
  if (tracks.length > 100) {
    throw new Error('Cannot add more than 100 tracks at once')
  }

  const uris = tracks.map((track) => track.uri)

  await fetch(`${config.spotifyWebApiBaseUrl}/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris,
    }),
  })
}
