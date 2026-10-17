<script setup>
import { ref } from 'vue'
import BasePanel from './components/BasePanel.vue';
import Input from './components/Input.vue';
import ShowList from './components/ShowList.vue';
import FindTask from './components/FindTask.vue';
import TaskStates from './components/TaskStates.vue';
import { useTaskStates } from './composables/useTaskStates.js';

const tasks = ref([])
const subjects = [
  'philosophy',      // 哲学
  'economics',       // 经济学
  'law',             // 法学
  'education',       // 教育学
  'literature',      // 文学
  'history',         // 历史学
  'science',         // 理学
  'engineering',     // 工学
  'agriculture',     // 农学
  'medicine',        // 医学
  'management',      // 管理学
  'art',             // 艺术学
  'interdisciplinary'// 交叉学科（2021年新增）
]
let taskId = 0;

const {total, completed, remaining, totalDuration} = useTaskStates(tasks.value);


function addTask(title, subject, duration) {
  tasks.value.push({
    title: title,
    subject: subject,
    duration: duration,
    id: taskId++,
    done: false
  })
}

function toggleTask(task) {
  task.done = !task.done
}

function removeTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

</script>

<template>
  <BasePanel class="panel">
    <TaskStates :total="total" :completed="completed" :remaining="remaining" :total-duration="totalDuration"/>
    <Input @add-task="addTask" :subjects="subjects" />
    <ShowList :is-empty="tasks.length === 0" :tasks="tasks" @remove-task="removeTask" @toggle-task="toggleTask"/>
    <FindTask :subjects="subjects" :tasks="tasks"/>
  </BasePanel>
</template>

<style scoped>
.panel > * {
  margin: 20px 0;
}
</style>
