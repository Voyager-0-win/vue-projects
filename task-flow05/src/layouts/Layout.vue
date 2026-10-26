<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h2>{{ title }}</h2>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped></style>
