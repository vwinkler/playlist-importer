<template>
  <div>
    <div>{{ result.trackName }}</div>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

defineProps<{
  result: SpotifyResultTrack
}>()
</script>
