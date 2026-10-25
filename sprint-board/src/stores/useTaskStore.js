import { defineStore } from "pinia"
import { ref, watch, computed } from 'vue'

function loadTask() {
  try {
    const saved = localStorage.getItem('sprint-board-tasks')
    if (saved === null) {
      return []
    }
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('task load error: ', error)
    return []
  }
}

function saveTask(tasks) {
  try {
    localStorage.setItem('sprint-board-tasks', JSON.stringify(tasks))
  } catch (error) {
    console.error('task save error: ', error)
  }
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(loadTask())

  watch(tasks, (newTasks) => saveTask(newTasks), {deep: true})

  function getTasks(projectId) {
    return tasks.value.filter(t => t.projectId === projectId)
  }
  function addTask(projectId, title, description, status, priority, dueDate, createAt) {
    tasks.value.push({
      id: tasks.value.reduce((max, t) => Math.max(max, t.id), 0) + 1,
      projectId,
      title,
      description,
      status,
      priority,
      dueDate,
      createAt
    })
    console.log(tasks.value)
  }
  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }
  function removeTasks(projectId) {
    tasks.value = tasks.value.filter(t => t.projectId !== projectId)
  }
  function toggleTaskStatus(id) {
    const arr = ['todo', 'in-progress', 'done']
    const task = tasks.value.find(t => t.id === id)
    task.status = arr[(arr.indexOf(task.status) + 1) % arr.length]
  }
  function clearTask() {
    tasks.value.length = 0
  }
  
  return {
    tasks,
    getTasks,
    addTask,
    removeTask,
    removeTasks,
    clearTask,
    toggleTaskStatus
  }
})