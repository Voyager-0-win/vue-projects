import type { Task } from "@/types/task"

function loadTask(): Task[] {
  try {
    const saved = localStorage.getItem('task-flow-tasks')
    if (saved === null) {
      return []
    }
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('load error: ', error)
    return []
  }
}

function saveTask(tasks: Task[]) {
  try {
    localStorage.setItem('task-flow-tasks', JSON.stringify(tasks))
  } catch (error) {
    console.error('save error: ', error)
  }
}

export {
  loadTask,
  saveTask
}