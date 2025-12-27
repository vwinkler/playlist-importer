<script setup lang="ts">
import { ref } from 'vue'
import SpotifySearchMask from './SpotifySearchMask.vue'
import SpotifyResultTrackView from './SpotifyResultTrackView.vue'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

defineProps<{
  accessToken: string
}>()

const searchResults = ref<SpotifyResultTrack[]>([])

function handleSearchResults(results: SpotifyResultTrack[]) {
  searchResults.value = results
}
</script>

<template>
  <div>
    <SpotifySearchMask :access-token="accessToken" @result="handleSearchResults" />
    <SpotifyResultTrackView v-if="searchResults.length > 0" :result="searchResults[0]" />
  </div>
</template>
