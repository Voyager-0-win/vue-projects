<script setup>
import Input from '@/components/Input.vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const taskStore = useTaskStore()
const route = useRoute()
const tasks = computed(() => {
  const status = route.query.status
  if (status === 'done') {
    return taskStore.tasks.filter(t => t.done)
  }
  if (status === 'undone') {
    return taskStore.tasks.filter(t => !t.done)
  }

  return taskStore.tasks
})

</script>

<template>
  <div class="box">
    <h2>Manage Your Tasks</h2>
    <Input @add-task="taskStore.addTask" class="input" />
    <p v-if="tasks.length === 0">You have no task...</p>
    <table v-else>
      <thead>
        <tr>
          <th>title</th>
          <th>done</th>
          <th>toggle</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in tasks" :key="i.id">
          <td>{{i.title}}</td>
          <td>{{ i.done }}</td>
          <td>
            <button class="table-btn" @click="taskStore.toggleTask(i.id)">
              {{ i.done ? 'Uncompleted' : 'Completed' }}
            </button>
          </td>
          <td>
            <button class="table-btn" @click="taskStore.removeTask(i.id)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

table {
  border-collapse: collapse;
  width: 500px;
  text-align: left;
  table-layout: fixed;
  margin-top: 20px;
}
th {
  color: #fff;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

td:hover {
  color: #fa0642;
}

th {
  background-color: #fa0642;
}

.table-btn {
  background-color: #fff;
  border-bottom: 1px #fa0642 solid;
  cursor: pointer;
  transition: 0.2s;
}

.table-btn:hover {
  transform: scale(1.1);
}

.input {
  margin-top: 10px;
}
</style>
