<template>
  <div>
    <span v-if="isAuthenticating">Authentication in progress...</span>
    <span v-else-if="!authState.isAuthenticated">Not authenticated</span>
    <span v-else>Authenticated</span>
    <button v-if="!authState.isAuthenticated && !isAuthenticating" @click="handleLogin">Login with Spotify</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { SpotifyAuthState } from '../SpotifyAuthState'
import { redirectForAuthorization, extractAuthorizationResponse, exchangeCodeForToken } from '../spotify/auth'

const props = defineProps<{
  authState: SpotifyAuthState
}>()

const emit = defineEmits<{
  'auth-state-changed': [authState: SpotifyAuthState]
}>()

const isAuthenticating = computed(() => {
  return extractAuthorizationResponse() !== null && !props.authState.isAuthenticated
})

onMounted(async () => {
  const authResponse = extractAuthorizationResponse()
  if (authResponse) {
    // TODO: Generate and store proper code verifier instead of placeholder
    const codeVerifier = 'placeholder-code-verifier'
    const newAuthState = await exchangeCodeForToken(authResponse, codeVerifier)
    emit('auth-state-changed', newAuthState)
  }
})

function handleLogin() {
  // TODO: Generate proper code challenge instead of placeholder
  redirectForAuthorization('placeholder-code-challenge')
}
</script>
