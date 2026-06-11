import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 4000;

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
