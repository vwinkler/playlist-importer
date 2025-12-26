<script setup lang="ts">
import { ref } from 'vue'
import SpotifySearchInput from './SpotifySearchInput.vue'
import SpotifySearchResult from './SpotifySearchResult.vue'

defineProps<{
  accessToken: string
}>()

const searchResult = ref<string>('')

function handleSearchResult(trackName: string) {
  searchResult.value = trackName
}
</script>

<template>
  <div>
    <SpotifySearchInput :access-token="accessToken" @result="handleSearchResult" />
    <SpotifySearchResult v-if="searchResult" :track-name="searchResult" />
  </div>
</template>
