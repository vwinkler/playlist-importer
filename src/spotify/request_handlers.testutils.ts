import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const MOCK_CLIENT_ID = 'test-client-id'
export const MOCK_REDIRECT_URI = 'http://example.com/callback'
export const MOCK_USER_ID = 'someuser'
export const MOCK_TRACK_SEARCH_TERM = 'Symphony No. 11'
export const MOCK_TRACK_2_SEARCH_TERM = 'creep'

export const MOCK_TOKEN_RESPONSE = {
  access_token: 'mocked-access-token',
  token_type: 'Bearer',
  expires_in: 3600,
  scope: 'playlist-modify-public playlist-modify-private',
}

export const MOCK_TRACK_ITEM = {
  album: {
    album_type: 'album',
    total_tracks: 4,
    available_markets: ['US', 'CA', 'GB'],
    external_urls: {
      spotify: 'https://open.spotify.com/album/3p5zVsLOeGmOM9E4LUn0bV',
    },
    href: 'https://api.spotify.com/v1/albums/3p5zVsLOeGmOM9E4LUn0bV',
    id: '3p5zVsLOeGmOM9E4LUn0bV',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273c92a2a994a815cdf20e38fee',
        height: 640,
        width: 640,
      },
      {
        url: 'https://i.scdn.co/image/ab67616d00001e02c92a2a994a815cdf20e38fee',
        height: 300,
        width: 300,
      },
      {
        url: 'https://i.scdn.co/image/ab67616d00004851c92a2a994a815cdf20e38fee',
        height: 64,
        width: 64,
      },
    ],
    name: 'Shostakovich: Symphony No. 11',
    release_date: '2019-06-07',
    release_date_precision: 'day',
    type: 'album',
    uri: 'spotify:album:3p5zVsLOeGmOM9E4LUn0bV',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/6s1pCNXcbdtQJlsnM1hRIA',
        },
        href: 'https://api.spotify.com/v1/artists/6s1pCNXcbdtQJlsnM1hRIA',
        id: '6s1pCNXcbdtQJlsnM1hRIA',
        name: 'Dmitri Shostakovich',
        type: 'artist',
        uri: 'spotify:artist:6s1pCNXcbdtQJlsnM1hRIA',
      },
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/1kLhJK7xiowRJJwf28NKhZ',
        },
        href: 'https://api.spotify.com/v1/artists/1kLhJK7xiowRJJwf28NKhZ',
        id: '1kLhJK7xiowRJJwf28NKhZ',
        name: 'Michael Sanderling',
        type: 'artist',
        uri: 'spotify:artist:1kLhJK7xiowRJJwf28NKhZ',
      },
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/03C9IJtseK0NX9zw53URjF',
        },
        href: 'https://api.spotify.com/v1/artists/03C9IJtseK0NX9zw53URjF',
        id: '03C9IJtseK0NX9zw53URjF',
        name: 'Dresdner Philharmonie',
        type: 'artist',
        uri: 'spotify:artist:03C9IJtseK0NX9zw53URjF',
      },
    ],
    is_playable: true,
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6s1pCNXcbdtQJlsnM1hRIA',
      },
      href: 'https://api.spotify.com/v1/artists/6s1pCNXcbdtQJlsnM1hRIA',
      id: '6s1pCNXcbdtQJlsnM1hRIA',
      name: 'Dmitri Shostakovich',
      type: 'artist',
      uri: 'spotify:artist:6s1pCNXcbdtQJlsnM1hRIA',
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1kLhJK7xiowRJJwf28NKhZ',
      },
      href: 'https://api.spotify.com/v1/artists/1kLhJK7xiowRJJwf28NKhZ',
      id: '1kLhJK7xiowRJJwf28NKhZ',
      name: 'Michael Sanderling',
      type: 'artist',
      uri: 'spotify:artist:1kLhJK7xiowRJJwf28NKhZ',
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/03C9IJtseK0NX9zw53URjF',
      },
      href: 'https://api.spotify.com/v1/artists/03C9IJtseK0NX9zw53URjF',
      id: '03C9IJtseK0NX9zw53URjF',
      name: 'Dresdner Philharmonie',
      type: 'artist',
      uri: 'spotify:artist:03C9IJtseK0NX9zw53URjF',
    },
  ],
  available_markets: ['US', 'CA', 'GB'],
  disc_number: 1,
  duration_ms: 1153186,
  explicit: false,
  external_ids: {
    isrc: 'DEE861901044',
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/4PWhgmUYtPebUnDRP8o9rw',
  },
  href: 'https://api.spotify.com/v1/tracks/4PWhgmUYtPebUnDRP8o9rw',
  id: '4PWhgmUYtPebUnDRP8o9rw',
  is_playable: true,
  name: 'Symphony No. 11 in G Minor, Op. 103, "The Year 1905": II. The 9th of January. Allegro - Adagio - Allegro - Adagio',
  popularity: 25,
  preview_url: null,
  track_number: 2,
  type: 'track',
  uri: 'spotify:track:4PWhgmUYtPebUnDRP8o9rw',
  is_local: false,
}

export const MOCK_TRACK_ITEM_2 = {
  album: {
    album_type: 'album',
    total_tracks: 12,
    available_markets: ['US', 'CA', 'GB'],
    external_urls: {
      spotify: 'https://open.spotify.com/album/3gBVdu4a1MMJVMy6vwPEb8',
    },
    href: 'https://api.spotify.com/v1/albums/3gBVdu4a1MMJVMy6vwPEb8',
    id: '3gBVdu4a1MMJVMy6vwPEb8',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273ec548c00d3ac2f10be73366d',
        height: 640,
        width: 640,
      },
      {
        url: 'https://i.scdn.co/image/ab67616d00001e02ec548c00d3ac2f10be73366d',
        height: 300,
        width: 300,
      },
      {
        url: 'https://i.scdn.co/image/ab67616d00004851ec548c00d3ac2f10be73366d',
        height: 64,
        width: 64,
      },
    ],
    name: 'Pablo Honey',
    release_date: '1993-02-22',
    release_date_precision: 'day',
    type: 'album',
    uri: 'spotify:album:3gBVdu4a1MMJVMy6vwPEb8',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb',
        },
        href: 'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb',
        id: '4Z8W4fKeB5YxbusRsdQVPb',
        name: 'Radiohead',
        type: 'artist',
        uri: 'spotify:artist:4Z8W4fKeB5YxbusRsdQVPb',
      },
    ],
    is_playable: true,
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb',
      },
      href: 'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb',
      id: '4Z8W4fKeB5YxbusRsdQVPb',
      name: 'Radiohead',
      type: 'artist',
      uri: 'spotify:artist:4Z8W4fKeB5YxbusRsdQVPb',
    },
  ],
  available_markets: ['US', 'CA', 'GB'],
  disc_number: 1,
  duration_ms: 238640,
  explicit: true,
  external_ids: {
    isrc: 'GBAYE9200070',
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r',
  },
  href: 'https://api.spotify.com/v1/tracks/70LcF31zb1H0PyJoS1Sx1r',
  id: '70LcF31zb1H0PyJoS1Sx1r',
  is_playable: true,
  name: 'Creep',
  popularity: 92,
  preview_url: null,
  track_number: 2,
  type: 'track',
  uri: 'spotify:track:70LcF31zb1H0PyJoS1Sx1r',
  is_local: false,
}

export const FALLBACK_TRACK_ITEM = {
  album: {
    album_type: 'album',
    total_tracks: 12,
    available_markets: ['US', 'CA', 'GB'],
    external_urls: {
      spotify: 'https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc',
    },
    href: 'https://api.spotify.com/v1/albums/2noRn2Aes5aoNVsU6iWThc',
    id: '2noRn2Aes5aoNVsU6iWThc',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273e318dbc0e47297ea17c9653a',
        height: 640,
        width: 640,
      },
      {
        url: 'https://i.scdn.co/image/ab67616d00001e02e318dbc0e47297ea17c9653a',
        height: 300,
        width: 300,
      },
      {
        url: 'https://i.scdn.co/image/ab67616d00004851e318dbc0e47297ea17c9653a',
        height: 64,
        width: 64,
      },
    ],
    name: 'Random Access Memories',
    release_date: '2013-05-17',
    release_date_precision: 'day',
    type: 'album',
    uri: 'spotify:album:2noRn2Aes5aoNVsU6iWThc',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi',
        },
        href: 'https://api.spotify.com/v1/artists/4tZwfgrHOc3mvqYlEYSvVi',
        id: '4tZwfgrHOc3mvqYlEYSvVi',
        name: 'Daft Punk',
        type: 'artist',
        uri: 'spotify:artist:4tZwfgrHOc3mvqYlEYSvVi',
      },
    ],
    is_playable: true,
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi',
      },
      href: 'https://api.spotify.com/v1/artists/4tZwfgrHOc3mvqYlEYSvVi',
      id: '4tZwfgrHOc3mvqYlEYSvVi',
      name: 'Daft Punk',
      type: 'artist',
      uri: 'spotify:artist:4tZwfgrHOc3mvqYlEYSvVi',
    },
  ],
  available_markets: ['US', 'CA', 'GB'],
  disc_number: 1,
  duration_ms: 337560,
  explicit: false,
  external_ids: {
    isrc: 'USQX91300105',
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/0DiWol3AO6WpXZgp0goxAV',
  },
  href: 'https://api.spotify.com/v1/tracks/0DiWol3AO6WpXZgp0goxAV',
  id: '0DiWol3AO6WpXZgp0goxAV',
  is_playable: true,
  name: 'Get Lucky',
  popularity: 80,
  preview_url: null,
  track_number: 8,
  type: 'track',
  uri: 'spotify:track:0DiWol3AO6WpXZgp0goxAV',
  is_local: false,
}

export const MOCK_SEARCH_RESPONSE = {
  tracks: {
    href: 'https://api.spotify.com/v1/search?offset=0&limit=1&query=Symphony%20No.%2011&type=track&locale=en-US,en;q%3D0.5',
    limit: 1,
    next: 'https://api.spotify.com/v1/search?offset=1&limit=1&query=Symphony%20No.%2011&type=track&locale=en-US,en;q%3D0.5',
    offset: 0,
    previous: null,
    total: 1000,
    items: [MOCK_TRACK_ITEM],
  },
}

export const MOCK_SEARCH_RESPONSE_2 = {
  tracks: {
    href: 'https://api.spotify.com/v1/search?offset=0&limit=1&query=creep&type=track&locale=en-US,en;q%3D0.5',
    limit: 1,
    next: 'https://api.spotify.com/v1/search?offset=1&limit=1&query=creep&type=track&locale=en-US,en;q%3D0.5',
    offset: 0,
    previous: null,
    total: 114,
    items: [MOCK_TRACK_ITEM_2],
  },
}

export const FALLBACK_SEARCH_RESPONSE = {
  tracks: {
    href: 'https://api.spotify.com/v1/search?offset=0&limit=1&query=fallback&type=track&locale=en-US,en;q%3D0.5',
    limit: 1,
    next: 'https://api.spotify.com/v1/search?offset=1&limit=1&query=fallback&type=track&locale=en-US,en;q%3D0.5',
    offset: 0,
    previous: null,
    total: 500,
    items: [FALLBACK_TRACK_ITEM],
  },
}

export const MOCK_PLAYLIST_RESPONSE = {
  collaborative: false,
  description: 'New playlist description',
  external_urls: {
    spotify: 'https://open.spotify.com/playlist/4jSPaUpF74pSeST1clMiR9',
  },
  followers: {
    href: null,
    total: 0,
  },
  href: 'https://api.spotify.com/v1/playlists/4jSPaUpF74pSeST1clMiR9',
  id: '4jSPaUpF74pSeST1clMiR9',
  images: [],
  primary_color: null,
  name: 'New Playlist',
  type: 'playlist',
  uri: 'spotify:playlist:4jSPaUpF74pSeST1clMiR9',
  owner: {
    href: `https://api.spotify.com/v1/users/${MOCK_USER_ID}`,
    id: MOCK_USER_ID,
    type: 'user',
    uri: `spotify:user:${MOCK_USER_ID}`,
    display_name: null,
    external_urls: {
      spotify: `https://open.spotify.com/user/${MOCK_USER_ID}`,
    },
  },
  public: false,
  snapshot_id: 'AAAA1F+xDhGZ7vOwfaEDJgaTGbBKzwNZ',
  tracks: {
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    href: 'https://api.spotify.com/v1/playlists/4jSPaUpF74pSeST1clMiR9/tracks',
    total: 0,
    items: [],
  },
}

export const handlers = [
  http.post('https://accounts.spotify.com/api/token', async ({ request }) => {
    const contentType = request.headers.get('Content-Type')

    if (contentType !== 'application/x-www-form-urlencoded') {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Invalid content type' },
        { status: 400 },
      )
    }

    const body = await request.text()
    const params = new URLSearchParams(body)

    if (params.get('grant_type') !== 'authorization_code') {
      return HttpResponse.json({ error: 'unsupported_grant_type' }, { status: 400 })
    }

    if (params.get('redirect_uri') !== MOCK_REDIRECT_URI) {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Invalid redirect_uri' },
        { status: 400 },
      )
    }

    if (params.get('client_id') !== MOCK_CLIENT_ID) {
      return HttpResponse.json({ error: 'invalid_client' }, { status: 400 })
    }

    if (!params.get('code') || !params.get('code_verifier')) {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Missing required parameters' },
        { status: 400 },
      )
    }

    return HttpResponse.json(MOCK_TOKEN_RESPONSE)
  }),
  http.get('https://api.spotify.com/v1/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    const type = url.searchParams.get('type')
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    if (!query || !type) {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Missing required parameters' },
        { status: 400 },
      )
    }

    if (query === MOCK_TRACK_SEARCH_TERM) {
      return HttpResponse.json(MOCK_SEARCH_RESPONSE)
    }

    if (query === MOCK_TRACK_2_SEARCH_TERM) {
      return HttpResponse.json(MOCK_SEARCH_RESPONSE_2)
    }

    return HttpResponse.json(FALLBACK_SEARCH_RESPONSE)
  }),
  http.post('https://api.spotify.com/v1/users/:userId/playlists', async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization')
    const contentType = request.headers.get('Content-Type')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    if (contentType !== 'application/json') {
      return HttpResponse.json(
        { error: 'invalid_request', error_description: 'Invalid content type' },
        { status: 400 },
      )
    }

    if (params.userId !== MOCK_USER_ID) {
      return HttpResponse.json({ error: 'forbidden' }, { status: 403 })
    }

    const body = await request.json()

    if (!body || typeof body !== 'object') {
      throw new Error('Invalid request body')
    }

    if (body.public !== false) {
      throw new Error('Only private playlists are allowed')
    }

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      throw new Error('Playlist name is required')
    }

    if (!body.description || typeof body.description !== 'string' || body.description.trim() === '') {
      throw new Error('Playlist description is required')
    }

    return HttpResponse.json(MOCK_PLAYLIST_RESPONSE)
  }),
]

export const server = setupServer(...handlers)
