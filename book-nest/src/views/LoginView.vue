<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function Login() {
  localStorage.setItem('book-nest-login', 'true')
  router.replace({name: route.query.redirect})
}
</script>

<template>
  <button @click="Login">Login</button>
</template>

<style scoped>

</style>
