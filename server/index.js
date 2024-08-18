import express, { urlencoded } from "express";
import CookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectToMongo } from "./config/db.connect.js";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
const app = express();

dotenv.config({});
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(ErrorHandler);
app.listen(process.env.PORT, () => {
  ConnectToMongo();
  console.log(`Server is Running !`);
});
