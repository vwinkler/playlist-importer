<template>
  <div>
    <span v-if="!authState.isAuthenticated">Not authenticated</span>
    <span v-else>Authenticated</span>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyAuthState } from '../SpotifyAuthState'

defineProps<{
  authState: SpotifyAuthState
}>()
</script>
