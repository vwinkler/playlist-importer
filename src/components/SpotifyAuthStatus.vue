<template>
  <div>
    <span v-if="!authState.isAuthenticated">Not authenticated</span>
    <span v-else>Authenticated</span>
    <button v-if="!authState.isAuthenticated" @click="handleLogin">Login with Spotify</button>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyAuthState } from '../SpotifyAuthState'
import { redirectForAuthorization } from '../spotify/auth'

defineProps<{
  authState: SpotifyAuthState
}>()

function handleLogin() {
  // TODO: Generate proper code challenge instead of placeholder
  redirectForAuthorization('placeholder-code-challenge')
}
</script>
