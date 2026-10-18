<script setup>
const emit = defineEmits(['delete-item'])
const props = defineProps({
  amount: Number,
  category: String,
  description: String,
  date: String
})
</script>

<template>
  <div class="box">
    {{ amount }}￥ | {{ category }} | {{ description }} | {{ date }}
    <button @click="emit('delete-item')">Del</button>
  </div>
</template>

<style scoped>
button {
  color: #000;
}
</style>
