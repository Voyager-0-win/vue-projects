import { computed, ref, watch } from "vue"
import { defineStore } from "pinia"

function loadTasks() {
  try {
    const saved = localStorage.getItem('taskflow-tasks')
    if (saved == null) {
      return []
    }
    const parsed = JSON.parse(saved)

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('loadTask error: ', error)
    return []
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
  } catch (error) {
    console.log('saveTask error: ', error)
  }
}


export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(loadTasks())

  watch(tasks, (newTasks) => {saveTasks(newTasks)}, {deep: true})

  const total = computed(() => tasks.value.length)
  const completed = computed(() => tasks.value.filter(t => t.done).length)
  const remaining = computed(() => total.value - completed.value)

  function addTask(title) {
    tasks.value.push({
      id: tasks.value.reduce((max, task) => Math.max(max, task.id), 0)+1,
      title,
      done: false
    })
    console.log(tasks.value)
  }
  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
    }
  }
  function removeTask(id) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }
  function clear() {
    tasks.value.length = 0
  }

  return {
    tasks,
    total,
    completed,
    remaining,
    addTask,
    toggleTask,
    removeTask,
    clear
  }
})