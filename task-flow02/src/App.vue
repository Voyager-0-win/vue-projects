<script setup>
import { ref } from 'vue';
import BasePanel from './components/BasePanel.vue';
import TaskHeader from './components/TaskHeader.vue';
import TaskStats from './components/TaskStats.vue';
import { useTaskStats } from '@/composables/useTaskStats';
import TaskList from './components/TaskList.vue';
import TaskItem from './components/TaskItem.vue';
import TaskInput from './components/TaskInput.vue';


const tasks = ref([])
let taskId = 0
const { total, completed, remaining } = useTaskStats(tasks);

function removeTask(id) {
  tasks.value = tasks.value.filter(task => task.id != id)
}
function toggleTask(task) {
  task.done = !task.done
}
function addTask(title) {
  tasks.value.push({
    title: title,
    done: false,
    id: taskId++
  })
}

const t = {
  title: "learn Vue",
  id: 0,
  done: false
}
tasks.value.push(t)
</script>

<template>
  <BasePanel>
    <TaskHeader title="My Flow" />
    <TaskStats :total="total" :completed="completed" :remaining="remaining"/>
    <TaskInput @add-task="addTask"/>
    <TaskList :is-empty="tasks.length === 0" :tasks="tasks" @remove-task="removeTask" @toggle-task="toggleTask"/>
  </BasePanel>
</template>

<style scoped>
</style>