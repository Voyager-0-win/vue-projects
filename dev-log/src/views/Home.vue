<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import { useLogStore } from '@/stores/useLogStore';

const logStore = useLogStore()
</script>

<template>
  <Layout title="HOME">
    <h3>TOTAL: {{ logStore.total }}</h3>
    <router-link :to="{name: 'log-new'}">Add one</router-link>
  </Layout>
</template>

<style scoped>

</style>
