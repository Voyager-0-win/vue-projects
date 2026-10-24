<script setup>
import { useBookStore } from '@/stores/useBookStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const bookStore = useBookStore()
const route = useRoute()
const status = route.query.status
const books = computed(() => {
  if (status === 'reading') {
    return bookStore.books.filter(b => b.status === 'reading')
  } else if (status === 'finished') {
    return bookStore.books.filter(b => b.status === 'finished')
  } else {
    return bookStore.books
  }
})

</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>AUTHOR</th>
          <th>CATEGORY</th>
          <th>STATUS</th>
          <th>NOTES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="books.length === 0">
          <td colspan="5">暂无书籍数据</td>
        </tr>
        <tr v-else v-for="i in books" :key="i.id">
          <td>{{ i.title }}</td>
          <td>{{ i.author }}</td>
          <td>{{ i.category }}</td>
          <td>{{ i.status }}</td>
          <td>{{ i.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 500px;
  height: 400px;
}
table {
  width: 100%;
  table-layout: fixed;
  user-select: none;
}
</style>
