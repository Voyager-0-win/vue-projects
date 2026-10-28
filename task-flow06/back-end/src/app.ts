import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { TaskRepository } from './repositories/task.repository';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { createTaskRouter } from './routes/task.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

export function createApp() {
  const app = express();
  const origin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';
  const dataDir = path.resolve(process.env.DATA_DIR ?? './data');

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin, credentials: true }));
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => res.json({ data: { status: 'ok' } }));

  const repository = new TaskRepository(dataDir);
  const service = new TaskService(repository);
  const controller = new TaskController(service);
  app.use('/api/tasks', createTaskRouter(controller));

  app.use(notFoundHandler);
  app.use(errorHandler);
  return { app, repository };
}
