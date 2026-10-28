import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { asyncHandler } from '../middleware/asyncHandler';

export function createTaskRouter(controller: TaskController): Router {
  const router = Router();
  // Static route must be registered before /:id.
  router.get('/stats', asyncHandler(controller.stats));
  router.get('/', asyncHandler(controller.list));
  router.post('/', asyncHandler(controller.create));
  router.get('/:id', asyncHandler(controller.getById));
  router.patch('/:id', asyncHandler(controller.update));
  router.delete('/:id', asyncHandler(controller.delete));
  return router;
}
