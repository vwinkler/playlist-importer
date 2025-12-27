<script setup lang="ts">
import { ref } from 'vue'
import SpotifySearchMask from './SpotifySearchMask.vue'
import SpotifyResultTrackView from './SpotifyResultTrackView.vue'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

defineProps<{
  accessToken: string
}>()

const searchResult = ref<SpotifyResultTrack | null>(null)

function handleSearchResult(result: SpotifyResultTrack) {
  searchResult.value = result
}
</script>

<template>
  <div>
    <SpotifySearchMask :access-token="accessToken" @result="handleSearchResult" />
    <SpotifyResultTrackView v-if="searchResult" :result="searchResult" />
  </div>
</template>
