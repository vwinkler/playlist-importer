<script setup lang="ts">
import { ref } from 'vue'
import SpotifyAuthStatus from './components/SpotifyAuthStatus.vue'
import type { SpotifyAuthState } from './SpotifyAuthState'

const authState = ref<SpotifyAuthState>({
  isAuthenticated: false,
  accessToken: undefined,
  expiresAt: undefined
})
</script>

<template>
  <h1>Playlist Importer</h1>
  <p>Import playlists from text format into Spotify (Work in Progress)</p>
  <SpotifyAuthStatus :authState="authState" />
</template>

<style scoped></style>
