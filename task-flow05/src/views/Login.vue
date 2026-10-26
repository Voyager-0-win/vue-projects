<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const to = (typeof route.query.redirect === 'string' && route.query.redirect) ? route.query.redirect : {name: 'home'}

function login() {
  localStorage.setItem('task-flow-login', 'true')
  router.replace(to)
}

</script>

<template>
  <Layout title="LOGIN">
    <button @click="login">LOGIN</button>
  </Layout>
</template>

<style scoped>

</style>
