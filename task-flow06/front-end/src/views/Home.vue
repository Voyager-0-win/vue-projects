<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const taskStore = useTaskStore()
const tableHead = ['title', 'description', 'priority', 'dueDate']

onMounted(() => taskStore.loadTasks())

</script>

<template>
  <p v-if="taskStore.loading">loading...</p>
  <button :disabled="taskStore.loading">{{ taskStore.loading ? 'loading' : 'reload' }}</button>
  <table>
    <thead>
      <tr>
        <th v-for="i in tableHead">{{ i.toLocaleUpperCase() }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="taskStore.tasks.length === 0">
        <th :colspan="tableHead.length">There is no tasks.</th>
      </tr>
      <template v-else>
        <tr v-for="i in taskStore.tasks" :key="i.id">
          <td @click="router.push(`/${i.id}`)" style="cursor: pointer;">{{ i.title }}</td>
          <td>{{ i.description }}</td>
          <td>{{ i.priority }}</td>
          <td>{{ i.dueDate }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 400px;
}
th, td {
  text-align: center;
}
</style>
