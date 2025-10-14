<template>
  <div>
    <span v-if="isAuthenticating">Authentication in progress...</span>
    <span v-else-if="!authState.isAuthenticated">Not authenticated</span>
    <span v-else>Authenticated</span>
    <button v-if="!authState.isAuthenticated && !isAuthenticating" @click="handleLogin">Login with Spotify</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SpotifyAuthState } from '../SpotifyAuthState'
import { redirectForAuthorization, extractAuthorizationResponse } from '../spotify/auth'

defineProps<{
  authState: SpotifyAuthState
}>()

const isAuthenticating = computed(() => {
  return extractAuthorizationResponse() !== null
})

function handleLogin() {
  // TODO: Generate proper code challenge instead of placeholder
  redirectForAuthorization('placeholder-code-challenge')
}
</script>
