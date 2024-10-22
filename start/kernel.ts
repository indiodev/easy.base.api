import cors from "cors";
import express from "express";

import { Env } from "@config/env";
import connectDatabase from "@config/mongoose/connect";

const app = express();

connectDatabase();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: '*',
//   credentials: true,
// }));
app.use(
  cors({
    origin:
      Env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://gbd-client-five.vercel.app",
    methods: "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("files"));

export { app };
