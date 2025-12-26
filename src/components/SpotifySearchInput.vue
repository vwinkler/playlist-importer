<template>
  <div>
    <button @click="search">Search</button>
  </div>
</template>

<script setup lang="ts">
import { config } from '../config'

const props = defineProps<{
  accessToken: string
}>()

const emit = defineEmits<{
  result: [trackName: string]
}>()

async function search() {
  const response = await fetch(
    `${config.spotifyWebApiBaseUrl}/v1/search?q=Symphony+No.+11&type=track&limit=1`,
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
