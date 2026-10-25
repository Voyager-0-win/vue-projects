<script setup>
import {useTaskStore} from '@/stores/useTaskStore'
import {useRoute} from 'vue-router'

const taskStore = useTaskStore()
const route = useRoute()
const taskId = Number(route.params.id)

const task = taskStore.tasks.find(t => t.id === taskId)

</script>

<template>
    <p v-if="!task">Task not found</p>
    <div v-else>
        <h1>Task Detail</h1>
        <p>ID: {{ task.id }}</p>
        <p>Title: {{ task.title }}</p>
        <p>Description: {{ task.description }}</p>
        <p>Priority: {{ task.priority }}</p>
        <p>Due Date: {{ task.dueDate }}</p>
        <p>Create At: {{ task.createAt }}</p>
    </div>
</template>