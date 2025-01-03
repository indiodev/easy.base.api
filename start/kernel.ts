import cookie from "cookie-parser";
import cors from "cors";
import express from "express";
import { join } from "path";

import { Env } from "@config/env";

const kernel = express();

kernel.use(
  cors({
    origin:
      Env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : [
            "https://gbd-client-five.vercel.app",
            "https://easy-base-front.vercel.app",
          ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"].join(","),
    credentials: true,
  }),
);

kernel.use(express.json());
kernel.use(express.urlencoded({ extended: true }));
kernel.use("/files", express.static(join(__dirname, "..", "files")));
kernel.use(cookie());

export { kernel };
