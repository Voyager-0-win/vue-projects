import type { InputTask, Task } from "@/types/task"

const BASE_URL = 'http://localhost:3000/api'

async function getTasksRequest(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`)
  if (!res.ok) {
    throw new Error(`request get error: ${res.status}`)
  }
  const data = await res.json()

  return data.data
}

async function addTaskRequest(input: InputTask) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })

  if (!res.ok) {
    throw new Error(`request add error: ${res.status}`)
  }
}

async function editTaskRequest(id: string, input: InputTask) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })
  if (!res.ok) {
    throw new Error(`reequest edit error: ${res.status}`)
  }
}

async function deleteTaskRequest(id: string) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  })

  if (!res.ok) {
    throw new Error(`request delete error: ${res.status}`)
  }
}

export {
  getTasksRequest,
  addTaskRequest,
  editTaskRequest,
  deleteTaskRequest
}