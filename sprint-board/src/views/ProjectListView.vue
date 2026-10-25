<script setup>
import { useProjectStore } from '@/stores/useProjectStore'
import { useRouter } from 'vue-router'

const router = useRouter()
import { ref } from 'vue'

const projectStore = useProjectStore()

const name = ref('test project')
const description = ref('test project description')
const beginDate = ref('2023-01-01')
const endDate = ref('2023-01-31')

function add() {
    const n = name.value.trim()
    const d = description.value.trim()
    if (n && d) {
        projectStore.addProject(n, d, beginDate.value, endDate.value)
    }
    else {
        alert('Please enter project name and description.')
    }
}

function remove(id) {
    if (confirm('Are you sure to delete this project?')) {
        projectStore.removeProject(id)
    }
}

function enterProject(id) {
    router.push({ name: 'project-detail', params: { id } })
}

function logout() {
    localStorage.removeItem('sprint-board-login')
    router.push('/login')
}

</script>

<template>
    <h1>Project List</h1>
    <div class="manage">
        <form @submit.prevent="add">
            <h2>Add Project</h2>
            <label for="name">Project Name:<input type="text" v-model="name"
                    placeholder="Enter project name"></label><br>
            <label for="description">Project Description:<input type="text" v-model="description"
                    placeholder="Enter project description"></label><br>
            <label for="beginDate">Begin Date:<input type="date" v-model="beginDate"
                    placeholder="Enter begin date"></label><br>
            <label for="endDate">End Date:<input type="date" v-model="endDate" placeholder="Enter end date"></label><br>
            <button type="submit">Add Project</button>
        </form>
        <button @click="projectStore.clearProject">Clear Project</button>
    </div>
    <div class="show">
        <h2>Project List</h2>
        <table>
            <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Begin Date</th>
                <th>End Date</th>
                <th>Action</th>
            </tr>
            <tr v-if="projectStore.projects.length === 0">
                <td colspan="5">No projects found.</td>
            </tr>
            <template v-elsse>
                <tr v-for="project in projectStore.projects" :key="project.id">
                    <td @click="enterProject(project.id)" style="cursor: pointer;">{{ project.name }}</td>
                    <td>{{ project.description }}</td>
                    <td>{{ project.beginDate }}</td>
                    <td>{{ project.endDate }}</td>
                    <td>
                        <button @click="remove(project.id)">Delete</button>
                    </td>
                </tr>
            </template>
        </table>
    </div>
    <div>
        <button @click="logout">Logout</button>
    </div>
</template>

<style scoped>
table {
    border-collapse: collapse;
    user-select: none;
}

td,
th {
    border: 1px solid black;
    padding: 5px;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

th,
td {
    text-align: center;
}
</style>
