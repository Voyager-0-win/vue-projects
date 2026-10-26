import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { loadTask, saveTask } from '@/utils/useTaskTool'
import type { Task, InputTask } from '@/types/task'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(loadTask())

  watch(tasks, (newTasks) => saveTask(newTasks), {
    deep
      : true
  })

  const total = computed(() => tasks.value.length)
  const completed = computed(() => tasks.value.filter(t => t.done).length)
  const remaining = computed(() => total.value - completed.value)
  const percent = computed(() => ((completed.value/total.value)*100 || 0).toFixed(1))

  function addTask(input: InputTask) {
    const task: Task = {
      id: tasks.value.reduce((max, t) => Math.max(max, t.id), 0)+1,
      done: false,
      ...input
    }
    tasks.value.push(task)
    console.log(tasks.value)
  }
  function toggleTask(id: number) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
    }
  }
  function removeTask(id: number) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return {
    tasks,
    total,
    completed,
    remaining,
    percent,
    addTask,
    toggleTask,
    removeTask
  }
})