<script setup>
import { useBookStore } from '@/stores/useBookStore'

const bookStore = useBookStore()

function Logout() {
  localStorage.removeItem('book-nest-login')
}
</script>

<template>
  <div class="homeview-box">
    <h3>TOTAL: {{ bookStore.total }}</h3>
    <h3>READING: {{ bookStore.reading }}</h3>
    <h3>FINISHED: {{ bookStore.finished }}</h3>
  </div>
  <button @click="bookStore.clear">CLEAR</button>
  <button @click="Logout">Logout</button>
</template>

<style scoped>

</style>
