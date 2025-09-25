import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import { clerkMiddleware } from '@clerk/express';

const allowedOrigins: string[] = [
  'https://feiras-al.vercel.app',
  'http://localhost:5173'
];

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

connectDB();
app.use("/api/events", eventRoutes);
app.use('/api/users', userRoutes);



app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});