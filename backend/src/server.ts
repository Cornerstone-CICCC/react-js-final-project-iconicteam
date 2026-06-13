import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/user.route";
import tripRouter from "./routes/trip.route";

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const PORT = process.env.PORT ?? 4000;

app.use("/users", userRouter);
app.use("/trips", tripRouter);

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
