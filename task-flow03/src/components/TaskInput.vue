<script setup>
import {ref} from 'vue'
import { useTaskStore } from '@/stores/taskStore'
const taskTitle = ref('learn React')
const taskStore = useTaskStore()
function addTask() {
  const title = taskTitle.value.trim()
  if (title) {
    taskStore.addTask(title)
  } else {
    alert('input error!')
  }
}
</script>

<template>
  <form @submit.prevent="addTask">
    <h3>Add Task</h3>
    <input type="text" v-model="taskTitle">
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
input {
  padding: 8px 15px;
  border-bottom: 1px #000 solid;
}
button {
  padding: 8px 10px;
  margin-left: 8px;
  border: 2px #999 solid;
}
button:hover {
  background-color: #999;
}
</style>
