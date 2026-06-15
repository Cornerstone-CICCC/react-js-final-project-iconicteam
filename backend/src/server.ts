import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors, { type CorsOptions } from "cors";
import eventRouter from "./routes/event.route";
import userRouter from "./routes/user.route";
import tripRouter from "./routes/trip.route";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_ORIGIN,
  process.env.FRONTEND_URL,
]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => origin.trim());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests and local tools without an Origin header.
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
const PORT = process.env.PORT ?? 4000;

app.use("/users", userRouter);
app.use("/trips", tripRouter);
app.use("/", eventRouter);

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
