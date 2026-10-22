<script setup>
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()

function signOut() {
  localStorage.removeItem('taskflow-sign-in')
}

</script>

<template>
  <div class="box">
    <h2>Browse Your Tasks</h2>
    <p v-if="taskStore.total === 0">You have no task...</p>
    <table v-else>
      <thead>
        <tr>
          <th>title</th>
          <th>done</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in taskStore.tasks" :key="i.id">
          <td>{{i.title}}</td>
          <td>{{ i.done }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="taskStore.clear" class="hover">Clear</button>
    <button @click="signOut" class="hover">SignOut</button>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 300px;
  text-align: left;
  margin-top: 10px;
}
th {
  color: #fff;
}

td:hover {
  color: #fa0642;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
  background-color: #fa0642;
}
button {
  background-color: #fa0642;
  color: #fff;
  padding: 7px 25px;
  margin: 20px 0;
  border-radius: 3px;
}
button:nth-of-type(2) {
  margin-left: 20px;
}

</style>
