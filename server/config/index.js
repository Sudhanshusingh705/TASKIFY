import dotenv, { config } from "dotenv";
dotenv.config();

export const { APP_PORT, DEBUG_MODE, JWT_SECRET, REFRESH_SECRET, MONGO_URI } =
  process.env;
