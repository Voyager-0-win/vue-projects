
export interface Task {
  id: number,
  title: string,
  done: boolean,
  priority?: 'low' | 'medium' | 'high',
  description?: string
}

export interface InputTask {
  title: string,
  priority?: 'low' | 'medium' | 'high',
  description?: string
}