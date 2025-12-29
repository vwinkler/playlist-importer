<script setup lang="ts">
import { ref } from 'vue'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'
import { getUserId } from '../spotify/user'
import { createPlaylist, addTracksToPlaylist } from '../spotify/playlist'

const props = defineProps<{
  tracks: SpotifyResultTrack[]
  accessToken: string
}>()

const success = ref(false)

async function handleCreatePlaylist() {
  const userId = await getUserId(props.accessToken)

  const result = await createPlaylist(
    userId,
    {
      name: 'New Playlist',
      description: 'Created with Playlist Importer',
    },
    props.accessToken,
  )

  await addTracksToPlaylist(result.id, props.tracks, props.accessToken)

  success.value = true
}
</script>

<template>
  <div>
    <button @click="handleCreatePlaylist">Create Playlist</button>
    <p v-if="success">Playlist created successfully</p>
  </div>
</template>
