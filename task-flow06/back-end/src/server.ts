import 'dotenv/config';
import { createApp } from './app';

async function main() {
  const { app, repository } = createApp();
  await repository.initialize();
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`TaskFlow API listening at http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  });
}

main().catch((error) => {
  console.error('Failed to start TaskFlow API:', error);
  process.exitCode = 1;
});
