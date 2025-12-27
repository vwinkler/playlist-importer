<template>
  <div>
    <input v-model="searchQuery" type="text" />
    <button @click="search">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { config } from '../config'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'

const props = defineProps<{
  accessToken: string
}>()

const emit = defineEmits<{
  result: [results: SpotifyResultTrack[]]
}>()

const searchQuery = ref('')

async function search() {
  const response = await fetch(
    `${config.spotifyWebApiBaseUrl}/v1/search?q=${searchQuery.value}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    },
  )
  const data = await response.json()
  emit('result', [{ trackName: data.tracks.items[0].name }])
}
</script>
