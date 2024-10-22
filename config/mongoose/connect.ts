import mongoose from "mongoose";

import { Env } from "@config/env";

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(Env.DATABASE_URL, {});
    console.info("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Termina o processo em caso de falha
  }
};

export default connect;
