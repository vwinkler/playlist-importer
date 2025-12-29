import { config } from '../config'

export async function getUserId(accessToken: string): Promise<string> {
  const response = await fetch(`${config.spotifyWebApiBaseUrl}/v1/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  return data.id
}
