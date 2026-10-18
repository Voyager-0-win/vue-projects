<script setup>
import { useItemStore } from '@/stores/itemStore';

const itemStore = useItemStore()
</script>

<template>
  <div class="box">
    <h3>DashBoard</h3>
    <p>TotalAmount: {{ itemStore.total }}￥</p>
    <p v-for="(val, key, index) in itemStore.count">
      {{ key }} : {{ val }}￥
    </p>
  </div>
</template>

<style scoped>

</style>
