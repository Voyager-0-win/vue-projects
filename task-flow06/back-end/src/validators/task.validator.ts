import { z } from 'zod';
import { TASK_PRIORITIES, TASK_STATUSES } from '../types/task';

const dueDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'dueDate must use YYYY-MM-DD').nullable();
export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'title cannot be empty').max(200),
  description: z.string().max(5000).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  priority: z.enum(TASK_PRIORITIES).optional(),
  dueDate: dueDateSchema.optional(),
}).strict();

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  priority: z.enum(TASK_PRIORITIES).optional(),
  dueDate: dueDateSchema.optional(),
}).strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field must be provided',
});

export const listQuerySchema = z.object({
  keyword: z.string().trim().max(200).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  priority: z.enum(TASK_PRIORITIES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'updatedAt', 'dueDate', 'title']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
}).strict();
