import express from 'express';
import dotenv from 'dotenv';
import courtsRouter from './src/routes/courtsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/courts",courtsRouter)

app.listen(PORT, () => {
  console.log(`Servidor On 🔥🔥 na porta ${PORT}`);
}
);
