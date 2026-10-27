<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import { useRoute } from 'vue-router';
import { useLogStore } from '@/stores/useLogStore';
import { computed } from 'vue';

const logStore = useLogStore()
const route = useRoute()
const id = Number(route.params.id)

const log = computed(() => logStore.logs.find(l => l.id === id))

</script>

<template>
  <Layout :title="'THE '+ id +' DETAIL'">
    <h2 v-if="!log">Not found the {{ id }}</h2>
    <template v-else>
      <h3>{{ log.id }}</h3>
      <h3>{{ log.title }}</h3>
      <h3>{{ log.content }}</h3>
      <h3>{{ log.createdAt }}</h3>
      <h3>{{ log.category }}</h3>
      <h3>{{ log.tags }}</h3>
    </template>
  </Layout>
  <router-view></router-view>
</template>

<style scoped>

</style>
