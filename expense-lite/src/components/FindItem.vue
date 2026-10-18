<script setup>
import { computed, ref } from 'vue';
import { categorys } from '@/stores/categoryStore';
import { useItemStore } from '@/stores/itemStore';
const category = ref(categorys[0])
const itemStore = useItemStore()
const goal_items = computed(() => itemStore.items.filter(item => item.category === category.value))
</script>

<template>
  <div class="box">
    <h3>FindExpense</h3>
    <div>
      <label for="category">ByCategory: </label>
      <select name="category" id="category" v-model="category">
        <option v-for="i in categorys" :value="i">{{ i }}</option>
      </select>
      <p v-if="goal_items.length === 0">There have no expense.</p>
      <ul v-else>
        <li v-for="i in goal_items" :key="i.id">
          {{ i.amount }}￥ | {{ i.category }} | {{ i.description }} | {{ i.date }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
select,
option {
  color: #000;
}
</style>
