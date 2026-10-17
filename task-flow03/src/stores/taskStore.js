import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

function loadTasks() {
  try {
    const saved = localStorage.getItem('taskflow-tasks')

    if (saved === null) {
      return []
    }

    const parsed = JSON.parse(saved)

    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('读取任务失败：', error)
    return []
  }
}
function saveTasks(tasks) {
  try {
    localStorage.setItem(
      'taskflow-tasks',
      JSON.stringify(tasks)
    )
  } catch (error) {
    console.error('保存任务失败：', error)
  }
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref(loadTasks())

  const total = computed(() => tasks.value.length)
  const completed = computed(
    () => tasks.value.filter(task => task.done).length
  )
  const remaining = computed(
    () => total.value - completed.value
  )
  const completionRate = computed(() => total.value ? (completed.value/total.value * 100).toFixed(1) + '%' : '0.0%')

  watch(
    tasks,
    (newTasks) => {
      saveTasks(newTasks)
    },
    { deep: true }
  )

  function addTask(title) {
    const nextId = tasks.value.reduce(
      (maxId, task) => Math.max(maxId, task.id),
      0
    ) + 1

    tasks.value.push({
      id: nextId,
      title,
      done: false
    })
  }

  function toggleTask(taskId) {
    const task = tasks.value.find(
      task => task.id === taskId
    )

    if (task) {
      task.done = !task.done
    }
  }

  function removeTask(taskId) {
    tasks.value = tasks.value.filter(
      task => task.id !== taskId
    )
  }

  return {
    tasks,
    total,
    completed,
    remaining,
    completionRate,
    addTask,
    toggleTask,
    removeTask
  }
})
