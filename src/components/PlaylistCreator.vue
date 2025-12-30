<script setup lang="ts">
import { ref } from 'vue'
import type { SpotifyResultTrack } from '../model/SpotifyResultTrack'
import { getUserId } from '../spotify/user'
import { createPlaylist, addTracksToPlaylist } from '../spotify/playlist'

const props = defineProps<{
  tracks: SpotifyResultTrack[]
  accessToken: string
}>()

const playlistName = ref('')
const playlistDescription = ref('')
const success = ref(false)

async function handleCreatePlaylist() {
  const userId = await getUserId(props.accessToken)

  const result = await createPlaylist(
    userId,
    {
      name: playlistName.value,
      description: playlistDescription.value,
    },
    props.accessToken,
  )

  await addTracksToPlaylist(result.id, props.tracks, props.accessToken)

  success.value = true
}
</script>

<template>
  <div>
    <div>
      <label for="playlist-name">Playlist Name</label>
      <input id="playlist-name" v-model="playlistName" type="text" />
    </div>
    <div>
      <label for="playlist-description">Description</label>
      <input id="playlist-description" v-model="playlistDescription" type="text" />
    </div>
    <button @click="handleCreatePlaylist">Create Playlist</button>
    <p v-if="success">Playlist created successfully</p>
  </div>
</template>
