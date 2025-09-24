import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexão com o banco
connectDB();

// Rotas
app.use("/api/events", eventRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
