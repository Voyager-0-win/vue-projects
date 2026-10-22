<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add-task'])
const title = ref('Learn Astro')
function addTask() {
  const temp = title.value.trim()
  if (temp) {
    emit('add-task', temp)
  } else {
    alert('input error!')
  }
}
</script>

<template>
  <div class="box">
    <input type="text" placeholder="Input Here..." v-model="title">
    <button @click="addTask">Add</button>
  </div>
</template>

<style scoped>
.box {
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 50px 1px rgba(0, 0, 0, 0.15);
  padding: 5px;
  border-radius: 3px;
}
input {
  flex: 1;
  padding: 0 5px;
}

input::placeholder {
  color: #bbb;
}

input:focus {
  outline: none;

}

button {
  background-color: #fa0642;
  color: #fff;
  padding: 7px 15px;
  border-radius: 4px;
  transition: 0.2s;
}

button:hover {
  transform: scale(1.1);
}
</style>
