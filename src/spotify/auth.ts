import { config } from '../config';

export function redirectForAuthorization(codeChallenge: string): void {
  const url = new URL('https://accounts.spotify.com/authorize');
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.spotifyClientId,
    scope: 'playlist-modify-public playlist-modify-private',
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: 'http://localhost:3000/callback',
  });

  url.search = params.toString();
  window.location.replace(url.toString());
}
