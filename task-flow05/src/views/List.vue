<script setup lang="ts">
import Layout from '@/layouts/Layout.vue'
import { useTaskStore } from '@/stores/useTaskStore'
import type { Task } from '@/types/task';

const taskStore = useTaskStore()
const tableHeaders = ['id', 'title', 'done', 'priority', 'description']

</script>

<template>
  <Layout title="LIST">
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
          </tr>
        </template>
      </tbody>
    </table>
  </Layout>
</template>

<style scoped></style>
