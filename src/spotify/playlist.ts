import { config } from '../config'

export interface PlaylistCreationData {
  name: string
  description: string
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
