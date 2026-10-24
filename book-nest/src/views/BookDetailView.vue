<script setup>
import { useBookStore } from '@/stores/useBookStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookStore = useBookStore()
const book = computed(() => bookStore.books.find(b => b.id === Number(route.params.id)))

</script>

<template>
  <h3>{{ book.title }}</h3>
  <h3>{{ book.author }}</h3>
  <h3>{{ book.category }}</h3>
  <h3>{{ book.status }}</h3>
  <h3>{{ book.notes }}</h3>
</template>

<style scoped>

</style>
