<template>
  <div>
    <textarea v-model="searchInput" />
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

const searchInput = ref('')

function splitLines(input: string): string[] {
  return input.split('\n').filter((line) => line.trim() !== '')
}

async function searchTrack(query: string): Promise<SpotifyResultTrack> {
  const response = await fetch(
    `${config.spotifyWebApiBaseUrl}/v1/search?q=${query}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    },
  )
  const data = await response.json()
  return { trackName: data.tracks.items[0].name }
}

async function search() {
  const lines = splitLines(searchInput.value)
  const results = await Promise.all(lines.map(searchTrack))
  emit('result', results)
}
</script>
