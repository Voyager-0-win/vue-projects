import { defineStore } from "pinia"
import { ref, watch, computed } from 'vue'

function loadBooks() {
  try {
    const saved = localStorage.getItem('book-nest-books')
    if (saved === null) {
      return []
    }
    const parsed = JSON.parse(saved)

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('load error:', error)
    return []
  }
}

function savedBooks(books) {
  try {
    localStorage.setItem('book-nest-books', JSON.stringify(books))
  } catch (error) {
    console.error('save error: ', error)
  }
}

export const useBookStore = defineStore('books', () => {
  const books = ref(loadBooks())

  watch(books, (newBooks) => savedBooks(newBooks), { deep: true })

  const total = computed(() => books.value.length)
  const reading = computed(() => books.value.filter(b => b.status === 'reading').length)
  const finished = computed(() => books.value.filter(b => b.status === 'finished').length)

  function addBook(title, author, category, status, notes) {
    books.value.push({
      id: books.value.reduce((max, b) => Math.max(max, b.id), 0) + 1,
      title,
      author,
      category,
      status,
      notes
    })
    console.log(books.value)
  }
  function removeBook(id) {
    books.value = books.value.filter(b => b.id !== id)
  }
  function modifyStatus(id) {
    const arr = ['want-to-read', 'reading', 'finished']
    const book = books.value.find(b => b.id === id)
    const index = arr.findIndex(t => t === book.status)
    book.status = arr[(index + 1) % 3]
  }
  function clear() {
    books.value.length = 0
  }

  return {
    books,
    total,
    reading,
    finished,
    addBook,
    removeBook,
    modifyStatus,
    clear
  }
})