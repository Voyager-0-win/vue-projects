<script setup>
import {computed} from 'vue'
import {useTaskStore} from '@/stores/useTaskStore'
import {useRoute} from 'vue-router'

const route = useRoute()
const projectId = Number(route.params.id)
const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks.filter(t => t.projectId === projectId))

const total = computed(() => tasks.value.length)
const done = computed(() => tasks.value.filter(t => t.status === 'done').length)
const inProgress = computed(() => tasks.value.filter(t => t.status === 'in-progress').length)
const percent = computed(() => (done.value / total.value) * 100 || 0)

</script>

<template>
    <div>
        <h1>Project Board</h1>
        <p>Total: {{ total }}</p>
        <p>Done: {{ done }}</p>
        <p>In Progress: {{ inProgress }}</p>
        <p>Percent: {{ percent.toFixed(2) }}%</p>
    </div>
</template>

