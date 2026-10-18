<script setup>
import { ref } from 'vue';
import { categorys } from '@/stores/categoryStore';
import { useItemStore } from '@/stores/itemStore';

const itemStore = useItemStore()

const amount = ref(1)
const category = ref(categorys[0])
const description = ref('none')
const date = ref('2026-11-11')

function addItem() {
  if (amount.value > 0 && description.value.trim()) {
    itemStore.addItem(amount.value, category.value, description.value.trim(), date.value)
  } else {
    alert('input error!')
  }
}
</script>

<template>
  <form @submit.prevent="addItem">
    <h3>Input your expense</h3>
    <div>
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model="amount">
    </div>

    <div>
      <label for="category">Category: </label>
      <select name="category" id="category" v-model="category">
        <option v-for="i in categorys" :value="i">{{ i }}</option>
      </select>
    </div>

    <div>
      <label for="description">Description: </label>
      <input type="text" id="description" v-model="description">
    </div>

    <div>
      <label for="date">Date: </label>
      <input type="date" id="date" v-model="date">
    </div>

    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
input,
select,
option,
button {
  color: #000;
}
</style>
