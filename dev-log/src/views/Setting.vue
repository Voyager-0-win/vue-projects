<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import { useLogStore } from '@/stores/useLogStore';

const logStore = useLogStore()
</script>

<template>
<Layout title="SETTINGS">
  <button @click="logStore.clearLogs">Clear</button>
</Layout>
</template>

<style scoped>

</style>
