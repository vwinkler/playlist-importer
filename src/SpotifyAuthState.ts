export type SpotifyAuthState =
  | {
      isAuthenticated: false
      accessToken: undefined
      expiresAt: undefined
    }
  | {
      isAuthenticated: true
      accessToken: string
      expiresAt: Date
    }
