<template>
  <div>
    <button @click="search">Search</button>
    <div v-if="trackName">{{ trackName }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  accessToken: string
}>()

const trackName = ref<string>('')

async function search() {
  // TODO: Use config.spotifyWebApiBaseUrl instead of hardcoded URL
  const response = await fetch(
    'https://api.spotify.com/v1/search?q=Symphony+No.+11&type=track&limit=1',
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    },
  )
  const data = await response.json()
  trackName.value = data.tracks.items[0].name
}
</script>
