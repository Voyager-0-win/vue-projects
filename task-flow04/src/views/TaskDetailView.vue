<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()
const route = useRoute()
const task = computed(() => {
  const id = Number(route.params.id)
  const task = taskStore.tasks.find(t => t.id === id)
  return task
})
</script>

<template>
  <div class="box" v-if="task">
    <h3>ID: {{ task.id }}</h3>
    <h3>TITLE: {{ task.title }}</h3>
    <h3>DONE: {{ task.done }}</h3>

    <p>{{ taskStore.tasks }}</p>
  </div>
  <h1 v-else>Task not found</h1>
</template>

<style scoped>

</style>
