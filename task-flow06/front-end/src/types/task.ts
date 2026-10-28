export type Priority = 'low' | 'medium' | 'high'

export type Status = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string,
  title: string,
  description: string,
  priority: Priority,
  status: Status,
  dueDate: string
}

export type InputTask = Omit<Task, 'id'>