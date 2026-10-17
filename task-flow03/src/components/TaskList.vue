<script setup>
import TaskItem from './TaskItem.vue';
defineProps({
  isEmpty: Boolean,
  tasks: Array
})
</script>

<template>
  <h3>Show List</h3>
  <p v-if="isEmpty">Nothing to do.</p>
  <ul v-else>
    <li v-for="task in tasks" :key="task.id">
      <TaskItem :title="task.title" :done="task.done" :id="task.id" />
    </li>
  </ul>
</template>

<style scoped>
li {
  margin: 0 20px;
}
</style>
