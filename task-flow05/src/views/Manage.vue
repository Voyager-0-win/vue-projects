<script setup lang="ts">
import Layout from '@/layouts/Layout.vue'
import {ref} from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import type { InputTask } from '@/types/task'

const taskStore = useTaskStore()

const title = ref('Learn Vue')
const description = ref('Great ideal')
const priority = ref<'low' | 'medium' | 'high'>('medium')

const tableHeaders = ['id', 'title', 'done', 'priority', 'description', 'toggle', 'delete']

function add() {
  const t = title.value.trim()
  const d = description.value.trim()
  if (t && d) {
    const input: InputTask = {
      title: t,
      description: d,
      priority: priority.value
    }
    taskStore.addTask(input)
  } else {
    alert('input error')
  }
}

</script>

<template>
  <Layout title="MANAGE">
    <form @submit.prevent="add">
      <label for="title">TITLE: </label>
      <input id="title" type="text" v-model="title"><br>
      <label for="description">DESCRIPTION: </label>
      <input id="description" type="text" v-model="description"><br>
      <label for="priority">
        PRIORITY: 
        <select id="priority" v-model="priority">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label><br>
      <button type="submit">Add</button>
    </form>
    <div class="container">
          <table>
      <thead>
        <tr>
          <th v-for="val in tableHeaders">{{ val.toLocaleUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="taskStore.total === 0">
          <th colspan="5">No Task</th>
        </tr>
        <template v-else>
          <tr v-for="t in taskStore.tasks" :key="t.id">
            <td>{{ t.id }}</td>
            <td>{{ t.title }}</td>
            <td>{{ t.done }}</td>
            <td>{{ t.priority }}</td>
            <td>{{ t.description }}</td>
            <td><button @click="taskStore.toggleTask(t.id)">TGL</button></td>
            <td><button @click="taskStore.removeTask(t.id)">DEL</button></td>
          </tr>
        </template>
      </tbody>
    </table>
    </div>
  </Layout>
</template>

<style scoped>

</style>
