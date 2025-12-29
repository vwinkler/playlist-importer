<script setup lang="ts">
import { ref } from 'vue'
import SpotifySearchMask from './SpotifySearchMask.vue'
import SpotifyResultTrackView from './SpotifyResultTrackView.vue'
import PlaylistCreator from './PlaylistCreator.vue'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

const props = defineProps<{
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
    <SpotifyResultTrackView v-for="(track, index) in searchResults" :key="index" :result="track" />
    <PlaylistCreator
      v-if="searchResults.length > 0"
      :tracks="searchResults"
      :access-token="props.accessToken"
    />
  </div>
</template>
