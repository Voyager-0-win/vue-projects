<script setup>
import ListItem from './ListItem.vue';
import { useItemStore } from '@/stores/itemStore.js';

const itemStore = useItemStore()
</script>

<template>
  <div class="box">
    <h3>ExpenseList</h3>
    <p v-if="itemStore.items.length === 0">You have no expense.</p>
    <ul v-else>
      <li v-for="i in itemStore.items" :key="i.id">
        <ListItem :amount="i.amount" :category="i.category" :description="i.description" :date="i.date" @delete-item="itemStore.removeItem(i.id)"/>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
