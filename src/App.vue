<script setup lang="ts">
import { ref } from 'vue'
import SpotifyAuthStatus from './components/SpotifyAuthStatus.vue'
import SpotifySearchInput from './components/SpotifySearchInput.vue'
import SpotifySearchResult from './components/SpotifySearchResult.vue'
import type { SpotifyAuthState } from './SpotifyAuthState'

const authState = ref<SpotifyAuthState>({
  isAuthenticated: false,
  accessToken: undefined,
  expiresAt: undefined,
})

const searchResult = ref<string>('')

function handleAuthStateChanged(newAuthState: SpotifyAuthState) {
  authState.value = newAuthState
}

function handleSearchResult(trackName: string) {
  searchResult.value = trackName
}
</script>

<template>
  <h1>Playlist Importer</h1>
  <p>Import playlists from text format into Spotify (Work in Progress)</p>
  <SpotifyAuthStatus :authState="authState" @auth-state-changed="handleAuthStateChanged" />
  <template v-if="authState.isAuthenticated && authState.accessToken">
    <SpotifySearchInput :access-token="authState.accessToken" @result="handleSearchResult" />
    <SpotifySearchResult v-if="searchResult" :track-name="searchResult" />
  </template>
</template>

<style scoped></style>
