<script setup>
defineProps({
  title: String,
  done: Boolean,
})
const emit = defineEmits(['remove-task', 'toggle-task'])

function removeTask() {
  emit('remove-task')
}

function toggleTask() {
  emit('toggle-task')
}
</script>

<template>
  <div>
    <span :class="{completed: done}">{{ title }}</span>
    <button @click="toggleTask">{{ done ? 'Uncomplete' : 'Complete'}}</button>
    <button @click="removeTask">Remove</button>
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
