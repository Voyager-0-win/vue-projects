import { AppError } from '../errors/AppError';
import { TaskRepository } from '../repositories/task.repository';
import type { CreateTaskInput, Task, TaskFilters, UpdateTaskInput } from '../types/task';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async list(filters: TaskFilters) {
    let tasks = await this.repository.findAll();
    if (filters.keyword) {
      const keyword = filters.keyword.toLocaleLowerCase();
      tasks = tasks.filter((task) =>
        task.title.toLocaleLowerCase().includes(keyword) ||
        task.description.toLocaleLowerCase().includes(keyword));
    }
    if (filters.status) tasks = tasks.filter((task) => task.status === filters.status);
    if (filters.priority) tasks = tasks.filter((task) => task.priority === filters.priority);

    const direction = filters.order === 'asc' ? 1 : -1;
    tasks.sort((a, b) => {
      const left = a[filters.sortBy] ?? '';
      const right = b[filters.sortBy] ?? '';
      return String(left).localeCompare(String(right)) * direction;
    });

    const total = tasks.length;
    const start = (filters.page - 1) * filters.pageSize;
    return {
      items: tasks.slice(start, start + filters.pageSize),
      pagination: {
        page: filters.page,
        pageSize: filters.pageSize,
        total,
        totalPages: Math.ceil(total / filters.pageSize),
      },
    };
  }

  async getById(id: string): Promise<Task> {
    const task = await this.repository.findById(id);
    if (!task) throw new AppError(404, 'TASK_NOT_FOUND', 'Task not found');
    return task;
  }

  create(input: CreateTaskInput): Promise<Task> {
    return this.repository.create(input);
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    // Check first to provide a consistent 404; repository checks again inside mutation.
    await this.getById(id);
    return this.repository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async stats() {
    const tasks = await this.repository.findAll();
    const now = new Date().toISOString().slice(0, 10);
    return {
      total: tasks.length,
      todo: tasks.filter((task) => task.status === 'todo').length,
      inProgress: tasks.filter((task) => task.status === 'in_progress').length,
      done: tasks.filter((task) => task.status === 'done').length,
      overdue: tasks.filter((task) => task.status !== 'done' && task.dueDate !== null && task.dueDate < now).length,
    };
  }
}
