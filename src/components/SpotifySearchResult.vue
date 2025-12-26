<template>
  <div>
    <div>{{ trackName }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  trackName: string
}>()
</script>
