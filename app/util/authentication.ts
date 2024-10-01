import { Env } from "@config/env";

export const Authentication = {
  JWT: {
    SECRET: Env.JWT_SECRET,
    EXPIRES_IN: "1d",
  },
};