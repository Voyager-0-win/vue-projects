<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
<div class="container">
  <h1>{{ title }}</h1>
  <slot />
</div>
</template>

<style scoped></style>
