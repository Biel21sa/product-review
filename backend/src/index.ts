import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import cors from "cors"; // Importe o middleware CORS

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Use o middleware CORS para permitir todas as origens (para desenvolvimento)
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/product-review", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions) // Cast para ConnectOptions
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use("/products", productRoutes);
app.use("/products/:productId/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Olá do seu backend!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
