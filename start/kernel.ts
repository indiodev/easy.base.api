import cookie from "cookie-parser";
import cors from "cors";
import express from "express";

import { Env } from "@config/env";
import connectDatabase from "@config/mongoose/connect";

const kernel = express();

connectDatabase();

kernel.use(
  cors({
    origin:
      Env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : [
            "https://gbd-client-five.vercel.app",
            "https://easy-base-front.vercel.app",
          ],
    methods: "*",
    credentials: true,
  }),
);

kernel.use(express.json());
kernel.use(express.urlencoded({ extended: true }));
kernel.use(express.static("files"));
kernel.use(cookie());

export { kernel };
