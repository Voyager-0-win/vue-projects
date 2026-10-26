<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';


</script>

<template>
  <Layout title="404NotFound">
    <h3><router-link :to="{ name: 'home' }">Go HOME</router-link></h3>
  </Layout>
</template>

<style scoped></style>
