<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'

const route = useRoute()
const id = Number(route.params.id)
const taskStore = useTaskStore()
const tasks = computed(() => taskStore.getTasks(id))

const title = ref('Add Task')
const description = ref('Add task description')
const status = ref('todo')
const priority = ref('low')
const dueDate = ref('2026-11-05')
const createAt = ref('2026-10-24T10:00:00.000Z')

function add() {
    const t = title.value.trim()
    const d = description.value.trim()

    if (t && d) {
        taskStore.addTask(id, t, d, status.value, priority.value, dueDate.value, createAt.value)
    } else {
        alert('Please enter task name and description.')
    }
}

</script>

<template>
    <h1>Project{{ id }} Detail</h1>
    <div class="manage">
        <h2>Add Task</h2>
        <form @submit.prevent="add">
            <label for="title">Task Name:<input type="text" v-model="title" placeholder="Enter task name"></label><br>
            <label for="description">Task Description:<input type="text" v-model="description"
                    placeholder="Enter task description"></label><br>
            <label for="status">Status:
                <select v-model="status">
                    <option value="todo">Todo</option>
                    <option value="done">Done</option>
                </select>
            </label><br>
            <label for="priority">Priority:
                <select v-model="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label><br>
            <label for="dueDate">Due Date:<input type="date" v-model="dueDate"
                    placeholder="Enter due date"></label><br>
            <label for="createAt">Create At:<input type="datetime" v-model="createAt"
                    placeholder="Enter create at"></label><br>
            <button type="submit">Add Task</button>
        </form>
        <button @click="taskStore.clearTask">Clear Task</button>
    </div>
    <div class="show">
        <h2>Task List</h2>
        <table>
            <tr>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Create At</th>
                <th>Action</th>
            </tr>
            <tr v-if="tasks.length === 0">
                <td colspan="7">No tasks found.</td>
            </tr>
            <tr v-for="task in tasks" :key="task.id" v-else>
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td @click="taskStore.toggleTaskStatus(task.id)">{{ task.status }}</td>
                <td>{{ task.priority }}</td>
                <td>{{ task.dueDate }}</td>
                <td>{{ task.createAt }}</td>
                <td>
                    <button @click="taskStore.removeTask(task.id)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
    <router-link :to="{ name: 'project-board', params: { id } }">Go to Project Board</router-link>
</template>

<style scoped>
.manage {
    margin-bottom: 20px;
}
.show {
    margin-top: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #ccc;
    padding: 8px;
}
th {
    background-color: #f2f2f2;
}

</style>