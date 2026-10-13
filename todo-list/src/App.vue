<script setup>
import { ref } from 'vue'
const taskTitle = ref('learn Vue')

const tasks = ref([])
let cnt = 0

function addTask() {
  const title = taskTitle.value.trim();
  if (title) {
    tasks.value.push({
      id: cnt++,
      title: title,
      done: false
    })
    taskTitle.value = ''
  } else {
    alert("请输入合适的TaskTitle")
  }
}
function toggleTask(task) {
  task.done = !task.done
}
function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id != id)
}
</script>

<template>
  <main>
    <section class="head">
      <h1>todo-list</h1>
    </section>
    <section class="show-board">
      <div>
        <strong>全部任务</strong>
        {{ tasks.length }}
      </div>
      <div>
        <strong>已完成</strong>
        {{tasks.filter(task => task.done).length}}
      </div>
      <div>
        <strong>未完成</strong>
        {{tasks.filter(task => !task.done).length}}
      </div>
    </section>
    <section class="input">
      <strong>添加新任务</strong>
      <form @submit.prevent="addTask">
        <input type="text" v-model="taskTitle">
        <button type="submit">Add</button>
      </form>
    </section>
    <section class="show-list">
      <strong>任务列表</strong>
      <p v-if="tasks.length === 0">暂无任务</p>
      <ul v-else>
        <li v-for="task in tasks" :key="task.id">
          <div class="task-bar">
            <button @click="toggleTask(task)" class="toggle-task">{{ task.done ? '√' : 'x' }}</button>
            <span :class="{ completed: task.done }">{{ task.title }}</span>
            <button @click="removeTask(task.id)">remove</button>
          </div>
        </li>
      </ul>
    </section>
    <section class="foot">

    </section>
  </main>
</template>

<style scoped>
section {
  padding: 5px 20px;
  /* border: 1px #999 solid; */
}
.completed {
  color: #999;
  text-decoration: line-through;
}

main {
  border: 1px #262626 solid;
}

li {
  margin: 10px;
}

li * {
  margin: 0 2px;
}

.toggle-task {
  border: none;
  border-radius: 50%;
  background-color: #ededed;
  color: #0d0d0d;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>