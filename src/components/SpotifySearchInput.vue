<template>
  <div>
    <input v-model="searchQuery" type="text" />
    <button @click="search">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { config } from '../config'

const props = defineProps<{
  accessToken: string
}>()

const emit = defineEmits<{
  result: [trackName: string]
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
  emit('result', data.tracks.items[0].name)
}
</script>
