import { defineStore } from "pinia"
import { ref } from "vue"
import type { InputTask, Task } from "@/types/task"
import { getTasksRequest, addTaskRequest, editTaskRequest, deleteTaskRequest } from "@/services/taskApi"

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref('')

  async function loadTasks() {
    loading.value = true
    error.value = ''
    try {
      tasks.value = await getTasksRequest()
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'unknow error'
    } finally {
      loading.value = false
    }
  }
  async function addTask(input:InputTask) {
    try {
      await addTaskRequest(input)
      await loadTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'add failed'
      throw err
    }
  }
  async function editTask(id: string, input: InputTask) {
    try {
      await editTaskRequest(id, input)
      await loadTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'edit failed'
      throw err
    }
  }
  async function deleteTask(id: string) {
    try {
      await deleteTaskRequest(id)
      await loadTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'edit failed'
      throw err
    }
  }
  
  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    editTask,
    deleteTask
  }
})