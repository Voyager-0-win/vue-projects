<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const id = route.params.id
const task = computed(() => taskStore.tasks.find(i => i.id === id))

onMounted(() => taskStore.loadTasks())

</script>

<template>
  <p v-if="!task">No id: {{ id }}</p>
  <template v-else>
    <h2>{{ task.id }}</h2>
    <h2>{{ task.title }}</h2>
    <h2>{{ task.description }}</h2>
    <h2>{{ task.priority }}</h2>
    <h2>{{ task.dueDate }}</h2>
    <button @click="router.push(route.fullPath+'/edit')">Edit</button>
    <button @click="taskStore.deleteTask(task.id)">Del</button>
  </template>
</template>

<style scoped>

</style>
