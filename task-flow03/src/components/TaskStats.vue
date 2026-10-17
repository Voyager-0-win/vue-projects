<script setup>
defineProps({
  total: Number,
  completed: Number,
  remaining: Number,
  completionRate: String
})
</script>

<template>
  <div class="main">
    <div class="box">Total: {{ total }}</div>
    <div class="box">Completed: {{ completed }}</div>
    <div class="box">Reamining: {{ remaining }}</div>
    <div class="box">CompletionRate: {{ completionRate }}</div>
  </div>
</template>

<style scoped>
</style>
