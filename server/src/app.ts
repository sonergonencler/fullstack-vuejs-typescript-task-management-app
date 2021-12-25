import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { ResponseError } from './utils/response-error';
import { connection } from './database/connection';
import cors from 'cors';
import helmet from 'helmet';
import tasksRoutes from './routes/tasks.routes';
import userRoutes from './routes/user.routes';

const main = async () => {
  await connection();

  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(helmet());

  app.use('/api/tasks', tasksRoutes);
  app.use('/api/user', userRoutes);

  app.use((error: ResponseError, _req: Request, res: Response, _next: NextFunction) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message;
    res.status(errorStatus).json({ ok: false, error: errorMessage });
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
