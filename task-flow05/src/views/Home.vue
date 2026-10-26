<script setup lang="ts">
import Layout from '@/layouts/Layout.vue'
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()

function logout() {
  localStorage.removeItem('task-flow-login')
}

</script>

<template>
  <Layout title="HOME">
    <h3>TOTAL: {{ taskStore.total }}</h3>
    <h3>COMPLETED: {{ taskStore.completed }}</h3>
    <h3>REMAAINING: {{ taskStore.remaining }}</h3>
    <h3>PERCENT: {{ taskStore.percent }}%</h3>
    <button @click="logout">LOGOUT</button>
  </Layout>
</template>

<style scoped>

</style>
