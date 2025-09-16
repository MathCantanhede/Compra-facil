import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// ✅ Permite requisições de qualquer origem (ideal para desenvolvimento)
app.use(cors());

// ✅ Permite interpretar JSON no corpo das requisições
app.use(express.json());

// ✅ Rotas da sua aplicação
app.use("/items", itemRoutes);
app.use("/user", userRoutes);


// ✅ Inicializa o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:3001`);
});