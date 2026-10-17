<script setup>
const props = defineProps({
  total: Number,
  completed: Number,
  remaining: Number,
  totalDuration: Number,
})

</script>

<template>
  <div class="box">
    <h3>Task States</h3>
    <p>Total: {{ total }}</p>
    <p>Completed: {{ completed }}</p>
    <p>Remaining: {{ remaining }}</p>
    <p>totalDuration: {{ totalDuration }}</p>
  </div>
</template>

<style scoped>

</style>
