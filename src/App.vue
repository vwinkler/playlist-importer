<script setup lang="ts">
import { ref } from 'vue'
import SpotifyAuthStatus from './components/SpotifyAuthStatus.vue'
import SpotifySearch from './components/SpotifySearch.vue'
import type { SpotifyAuthState } from './SpotifyAuthState'

const authState = ref<SpotifyAuthState>({
  isAuthenticated: false,
  accessToken: undefined,
  expiresAt: undefined,
})

function handleAuthStateChanged(newAuthState: SpotifyAuthState) {
  authState.value = newAuthState
}
</script>

<template>
  <h1>Playlist Importer</h1>
  <p>Import playlists from text format into Spotify (Work in Progress)</p>
  <SpotifyAuthStatus :authState="authState" @auth-state-changed="handleAuthStateChanged" />
  <template v-if="authState.isAuthenticated && authState.accessToken">
    <SpotifySearch :access-token="authState.accessToken" />
  </template>
</template>

<style scoped></style>
