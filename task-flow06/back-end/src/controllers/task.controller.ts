import type { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { createTaskSchema, listQuerySchema, updateTaskSchema } from '../validators/task.validator';
import { AppError } from '../errors/AppError';

export class TaskController {
  constructor(private readonly service: TaskService) {}

  list = async (req: Request, res: Response) => {
    const filters = listQuerySchema.parse(req.query);
    const result = await this.service.list(filters);
    res.json({ data: result.items, pagination: result.pagination });
  };

  stats = async (_req: Request, res: Response) => {
    res.json({ data: await this.service.stats() });
  };

  getById = async (req: Request, res: Response) => {
    res.json({ data: await this.service.getById(this.getId(req.params.id)) });
  };

  create = async (req: Request, res: Response) => {
    const input = createTaskSchema.parse(req.body);
    const task = await this.service.create(input);
    res.status(201).json({ data: task });
  };

  update = async (req: Request, res: Response) => {
    const input = updateTaskSchema.parse(req.body);
    const task = await this.service.update(this.getId(req.params.id), input);
    res.json({ data: task });
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(this.getId(req.params.id));
    res.status(204).send();
  };

  private getId(value: string | string[] | undefined): string {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new AppError(400, 'INVALID_TASK_ID', 'A valid task ID is required');
    }
    return value;
  }
}
