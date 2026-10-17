<script setup>
import TaskItem from './TaskItem.vue';
defineProps({
  isEmpty: Boolean,
  tasks: Array
})
const emit = defineEmits(['toggle-task', 'remove-task'])

</script>

<template>
  <div class="box">
    <h3>Task List</h3>
    <div class="show">
      <p v-if="isEmpty">There is nothing to do.</p>
      <ul v-else>
        <li v-for="task in tasks" :key="task.id">
          <TaskItem :title="task.title" :subject="task.subject" :duration="task.duration" :done="task.done" @toggle-task="emit('toggle-task', task)" @remove-task="emit('remove-task', task.id)"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
