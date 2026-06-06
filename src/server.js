import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  await connectMongoDB();

  const app = express();

  app.use(cookieParser());

  app.use(logger);

  app.use(cors());

  app.use(express.json());

  app.use(authRoutes);

  app.use(notesRoutes);
  app.use(userRoutes);

  app.use(notFoundHandler);

  app.use(errors());

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

bootstrap();
