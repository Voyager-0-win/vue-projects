export type LogCategory =
  | 'learning'
  | 'bugfix'
  | 'project'

export interface InputLog {
  title: string
  content: string
  category: LogCategory
  tags: string[]
}

export interface Log {
  id: number
  title: string
  content: string
  createdAt: string
  category: LogCategory
  tags: string[]
}