import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import { clerkMiddleware } from '@clerk/express';

const allowedOrigins: string[] = [
  `${process.env.URL_SERVER_FRONT}`,
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // A condição !origin permite requisições sem origem (como Postman/Insomnia)
    // O '!' em origin! diz ao TypeScript que, neste ponto, origin não será undefined
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido por CORS'));
    }
  }
};

const app2 = express();
app2.use(cors(corsOptions));

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: `${process.env.URL_SERVER_FRONT}` }));
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

connectDB();
app.use("/api/events", eventRoutes);
app.use('/api/users', userRoutes);



app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});