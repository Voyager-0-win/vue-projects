<script setup>
import { useTaskStore } from '@/stores/taskStore';
defineProps({
  title: String,
  done: Boolean,
  id: Number
})
const taskStore = useTaskStore()

</script>

<template>
  <div>
    <span :class="{ completed: done }">{{ title }}</span>
    <button @click="taskStore.toggleTask(id)">{{ done ? 'Uncomplete' : 'Complete' }}</button>
    <button @click="taskStore.removeTask(id)">Remove</button>
  </div>
</template>

<style scoped>
div {
  padding: 10px;
  display: flex;
}

div * {
  margin: 0 5px;
}

span {
  flex: 2;
}

button {
  flex: 1;
  border: 2px #999 solid;
}

button:hover {
  background-color: #999;
}
</style>
