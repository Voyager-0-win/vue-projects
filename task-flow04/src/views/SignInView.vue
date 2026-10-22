<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function signIn() {
  localStorage.setItem('taskflow-sign-in', 'true')
  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/')) {
    router.replace(redirect)
  } else {
    router.replace({
      name: 'home'
    })
  }
}
</script>

<template>
  <div class="box">
    <button class="hover" @click="signIn">Sign In</button>
  </div>
</template>

<style scoped>
button {
  background-color: #fa0642;
  color: #fff;
  padding: 7px 25px;
  margin: 20px 0;
  border-radius: 3px;
}
</style>
