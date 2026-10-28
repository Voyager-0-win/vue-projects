<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import type { InputTask, Priority, Status } from '@/types/task'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const taskStore = useTaskStore()
const task = computed(() => taskStore.tasks.find(i => i.id === id))
const title = ref(task.value?.title)
const description = ref(task.value?.description)
const priority = ref<Priority>(task.value?.priority ?? 'low')
const status = ref<Status>(task.value?.status ?? 'done')
const dueDate = ref(task.value?.dueDate ?? '1997-01-01')

function edit() {
  if (typeof(id) === 'string') {
    const clean_title = title.value?.trim()
    const clean_description = description.value?.trim()
    if (clean_description && clean_title) {
      const task: InputTask = {
        title: clean_title,
        description: clean_description,
        priority: priority.value,
        status: status.value,
        dueDate: dueDate.value
      }
      taskStore.editTask(id, task)
    }
  }
}
</script>

<template>
  <p v-if="!task">No id: {{ id }}</p>
  <form @submit.prevent="edit" v-else>
    <label for="title">TITLE: </label>
    <input type="text" id="title" v-model="title"><br>
    <label for="description">DESCRIPTION: </label>
    <textarea id="description" v-model="description"></textarea><br>
    <label for="priority">PRIORITY: </label>
    <select id="priority" v-model="priority">
      <option value="high">high</option>
      <option value="medium">medium</option>
      <option value="low">low</option>
    </select><br>
    <label for="status">STATUS: </label>
    <select id="status" v-model="status">
      <option value="todo">todo</option>
      <option value="in_progress">in_progress</option>
      <option value="done">done</option>
    </select><br>
    <input type="date" v-model="dueDate"><br>
    <button type="submit">Edit</button>
  </form>
</template>

<style scoped></style>
