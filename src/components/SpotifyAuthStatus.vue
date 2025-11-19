<template>
  <div>
    <span v-if="isAuthenticating">Authentication in progress...</span>
    <span v-else-if="!authState.isAuthenticated">Not authenticated</span>
    <span v-else>Authenticated</span>
    <button v-if="!authState.isAuthenticated && !isAuthenticating" @click="handleLogin">
      Login with Spotify
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { SpotifyAuthState } from '../SpotifyAuthState'
import {
  redirectForAuthorization,
  extractAuthorizationResponse,
  exchangeCodeForToken,
} from '../spotify/auth'
import { generateRandomString } from '../util/authentication'

const props = defineProps<{
  authState: SpotifyAuthState
}>()

const emit = defineEmits<{
  'auth-state-changed': [authState: SpotifyAuthState]
}>()

const isAuthenticating = computed(() => {
  return (
    extractAuthorizationResponse() !== null &&
    !props.authState.isAuthenticated &&
    sessionStorage.getItem('code_verifier') !== null
  )
})

onMounted(async () => {
  if (!isAuthenticating.value) {
    return
  }

  const authResponse = extractAuthorizationResponse()!
  const codeVerifier = sessionStorage.getItem('code_verifier')!

  const newAuthState = await exchangeCodeForToken(authResponse, codeVerifier)
  sessionStorage.removeItem('code_verifier')
  emit('auth-state-changed', newAuthState)
})

function handleLogin() {
  const codeVerifier = generateRandomString(64)
  sessionStorage.setItem('code_verifier', codeVerifier)
  // TODO: Generate proper code challenge instead of placeholder
  redirectForAuthorization('placeholder-code-challenge')
}
</script>
