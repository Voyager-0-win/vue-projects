<script setup>
import { ref } from 'vue';
import BasePanel from './components/BasePanel.vue';
import Input from './components/Input.vue';
import ExpenseList from './components/ExpenseList.vue';
import ShowBoard from './components/ShowBoard.vue';
import FindItem from './components/FindItem.vue';

const items = ref([])

</script>

<template>
  <BasePanel>
    <ShowBoard />
    <Input />
    <ExpenseList />
    <FindItem />
  </BasePanel>
</template>

<style scoped>

</style>
