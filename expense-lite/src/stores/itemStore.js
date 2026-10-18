import { defineStore } from "pinia";
import {computed, ref, watch} from 'vue'
import { categorys } from "./categoryStore";

function loadItems() {
  try {
    const saved = localStorage.getItem('expense-lite-items')
    if (saved === null) {
      return []
    }
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('load failed: ', error);
    return []
  }
}
function saveItems(items) {
  try {
    localStorage.setItem('expense-lite-items', JSON.stringify(items))
  } catch (error) {
    console.error('save failed: ', error)
  }
}

export const useItemStore = defineStore('item', () => {
  const items = ref(loadItems())

  const count = computed(() => {
    const countCategory = {}
    for (const item of items.value) {
      if (Object.hasOwn(countCategory, item.category)) {
        countCategory[item.category] += item.amount
      } else {
        countCategory[item.category] = item.amount;
      }
    }
    return countCategory
  })

  watch(items, (newItems) => {
    saveItems(newItems)
  }, { deep: true })

  const total = computed(() => items.value.reduce((sum, item) => sum + item.amount, 0))

  function addItem(amount, category, description, date) {
    items.value.push({
      id: items.value.reduce((max, item) => Math.max(max, item.id), 0) + 1,
      amount: amount,
      category: category,
      description: description,
      date: date
    })
  }
  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return {
    items,
    total,
    count,
    addItem,
    removeItem,
  }
})