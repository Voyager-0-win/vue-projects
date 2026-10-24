<script setup>
import { ref } from 'vue'
import { CATEGORY_MAP } from '@/assets/utils'
import { useBookStore } from '@/stores/useBookStore'

const bookStore = useBookStore()
const title = ref('Jobs')
const author = ref('xxx')
const category = ref(Object.keys(CATEGORY_MAP)[0])
const status = ref('want-to-read')
const notes = ref('Great')

function submit() {
  const tit = title.value.trim()
  const aut = author.value.trim()
  const not = notes.value.trim()

  if (tit && aut && not) {
    bookStore.addBook(tit, aut, category.value, status.value, not)
  } else {
    alert('input error')
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="title"><strong>TITLE: </strong></label>
    <input type="text" placeholder="title" id="title" v-model="title">
    <br>
    <label for="author"><strong>AUTHOR: </strong></label>
    <input type="text" placeholder="author" id="author" v-model="author">
    <br>
    <label for="category"><strong>CATEGORY: </strong></label>
    <select id="category" v-model="category">
      <option v-for="(a, b) in CATEGORY_MAP" :value="b">{{ a }}</option>
    </select>
    <br>
    <label for="status"><strong>STATUS: </strong></label>
    <label><input type="radio" value="want-to-read" v-model="status">want-to-read</label>
    <label><input type="radio" value="reading" v-model="status">reading</label>
    <label><input type="radio" value="finished" v-model="status">finished</label>
    <br>
    <label for="notes"><strong>NOTES: </strong></label>
    <input type="text" placeholder="notes" id="notes" v-model="notes">
    <br>
    <button type="submit">Add</button>
  </form>
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
        <tr v-if="bookStore.books.length === 0">
          <td colspan="5">暂无书籍数据</td>
        </tr>
        <tr v-else v-for="i in bookStore.books" :key="i.id">
          <td>{{ i.title }}</td>
          <td>{{ i.author }}</td>
          <td>{{ i.category }}</td>
          <td @click="bookStore.modifyStatus(i.id)" style="cursor: pointer;">{{ i.status }}</td>
          <td>{{ i.notes }}</td>
          <td @click="bookStore.removeBook(i.id)"><button>Del</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 600px;
  height: 400px;
}
table {
  width: 100%;
  table-layout: fixed;
  user-select: none;
}
</style>
