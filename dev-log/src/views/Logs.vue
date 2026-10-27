<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import { useLogStore } from '@/stores/useLogStore'

const logStore = useLogStore()
const tableHead = ['id', 'title', 'content', 'createAt', 'category', 'tags']

</script>

<template>
<Layout title="LOGS">
  <table>
    <thead>
      <tr>
        <th v-for="i in tableHead">{{ i.toLocaleUpperCase() }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="logStore.logs.length === 0">
        <th  colspan="6">No Logs</th>
      </tr>
      <template v-else>
        <tr v-for="i in logStore.logs" :key="i.id">
          <td>{{ i.id }}</td>
          <td>{{ i.title }}</td>
          <td>{{ i.content }}</td>
          <td>{{ i.createdAt }}</td>
          <td>{{ i.category }}</td>
          <td>{{ i.tags }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</Layout>
<router-view />
</template>

<style scoped>

</style>
