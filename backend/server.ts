  import express from 'express';
  import dotenv from 'dotenv';
  import courtsRouter from './src/routes/courtsRoutes';
  import userRouter from './src/routes/usersRoutes';
  import cors, { CorsOptions } from 'cors';

  dotenv.config();
  
  const corsOptions:CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  const app = express();

  app.use(express.json());
  app.use(cors(corsOptions))
  app.use("/courts",courtsRouter);
  app.use("/user",userRouter);

  app.listen('8080', () => {
    console.log(`Servidor On 🔥🔥 na porta 8080`);
  }
  );
