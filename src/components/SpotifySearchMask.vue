<template>
  <div>
    <textarea v-model="searchInput" />
    <button @click="search">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { searchTrack } from '../spotify/search'
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

async function search() {
  const lines = splitLines(searchInput.value)
  const results = await Promise.all(lines.map((query) => searchTrack(query, props.accessToken)))
  emit('result', results)
}
</script>
