<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import type { InputTask, Priority, Status } from '@/types/task'
import { ref } from 'vue'

const taskStore = useTaskStore()
const title = ref('learn vue')
const description = ref('xxxxxx')
const priority = ref<Priority>('medium')
const status = ref<Status>('todo')
const dueDate = ref('2026-09-01')

function add() {
  const clean_title = title.value.trim()
  const clean_description = description.value.trim()
  if (clean_description && clean_title) {
    const input: InputTask = {
      title: clean_title,
      description: clean_description,
      priority: priority.value,
      status: status.value,
      dueDate: dueDate.value
    }
    taskStore.addTask(input)
  }
}
</script>

<template>
  <form @submit.prevent="add">
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
    <button type="submit">Add</button>
  </form>
</template>

<style scoped></style>
