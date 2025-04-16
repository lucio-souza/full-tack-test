import express from 'express';
import dotenv from 'dotenv';
import courtsRouter from './src/routes/courtsRoutes';
import userRouter from './src/routes/usersRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/courts",courtsRouter);
app.use("/user",userRouter);

app.listen(PORT, () => {
  console.log(`Servidor On 🔥🔥 na porta ${PORT}`);
}
);
