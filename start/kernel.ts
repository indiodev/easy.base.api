import cors from "cors";
import express from "express";

import { Env } from "@config/env";
import connectDatabase from "@config/mongoose/connect";

const app = express();

connectDatabase();

app.use(
  cors({
    origin:
      Env.NODE_ENV === "development"
        ? "*"
        : '"https://gbd-client-five.vercel.app/"',
    methods: "*",
    credentials: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("files"));

export { app };
