<script setup>
import { ref } from 'vue';
import BasePanel from './components/BasePanel.vue';
import TaskHeader from './components/TaskHeader.vue';
import TaskStats from './components/TaskStats.vue';
import { useTaskStats } from '@/composables/useTaskStats';
import TaskList from './components/TaskList.vue';
import TaskInput from './components/TaskInput.vue';
import { useTaskStore } from './stores/taskStore.js';
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks, total, completed, remaining, completionRate } = storeToRefs(taskStore);

</script>

<template>
  <BasePanel>
    <TaskHeader title="My Flow" />
    <TaskStats :total="total" :completed="completed" :remaining="remaining" :completionRate="completionRate" />
    <TaskInput />
    <TaskList :is-empty="total === 0" :tasks="tasks" />
  </BasePanel>
</template>

<style scoped></style>