import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { CsvFile } from '../storage/csvFile';
import { AppError } from '../errors/AppError';
import type { CreateTaskInput, Task, UpdateTaskInput } from '../types/task';

// CSV stores primitive strings; conversion happens at the repository boundary.
type TaskRow = Record<keyof Task, string>;
const columns: (keyof Task)[] = [
  'id', 'title', 'description', 'status', 'priority', 'dueDate', 'createdAt', 'updatedAt',
];

function fromRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status as Task['status'],
    priority: row.priority as Task['priority'],
    dueDate: row.dueDate || null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function toRow(task: Task): TaskRow {
  return {
    ...task,
    dueDate: task.dueDate ?? '',
  } as TaskRow;
}

export class TaskRepository {
  private readonly file: CsvFile<TaskRow>;

  constructor(dataDir: string) {
    this.file = new CsvFile<TaskRow>(path.join(dataDir, 'data.csv'), columns);
  }

  async initialize(): Promise<void> {
    await this.file.initialize();
  }

  async findAll(): Promise<Task[]> {
    return (await this.file.readRows()).map(fromRow);
  }

  async findById(id: string): Promise<Task | undefined> {
    const rows = await this.file.readRows();
    const row = rows.find((item) => item.id === id);
    return row ? fromRow(row) : undefined;
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title: input.title,
      description: input.description ?? '',
      status: input.status ?? 'todo',
      priority: input.priority ?? 'medium',
      dueDate: input.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    };
    await this.file.mutate((rows) => ({ rows: [...rows, toRow(task)], result: undefined }));
    return task;
  }

  async update(id: string, changes: UpdateTaskInput): Promise<Task> {
    return this.file.mutate((rows) => {
      const index = rows.findIndex((row) => row.id === id);
      if (index < 0) throw new AppError(404, 'TASK_NOT_FOUND', 'Task not found');
      const existing = fromRow(rows[index]);
      const updated: Task = { ...existing, ...changes, updatedAt: new Date().toISOString() };
      const next = [...rows];
      next[index] = toRow(updated);
      return { rows: next, result: updated };
    });
  }

  async delete(id: string): Promise<void> {
    await this.file.mutate((rows) => {
      const index = rows.findIndex((row) => row.id === id);
      if (index < 0) throw new AppError(404, 'TASK_NOT_FOUND', 'Task not found');
      return { rows: rows.filter((row) => row.id !== id), result: undefined };
    });
  }
}
