import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { APP_PORT, MONGO_URI } from "./config";
import errrorHandler from "./middleware/errorHandler";
import authRoute from "./routes/authRoute";
import collectionRoute from "./routes/collectionRoute";
import { taskRoute } from "./routes/taskRoute";
const app = express();
const PORT = APP_PORT;

async function main() {
  await mongoose.connect(MONGO_URI);
}
main();

// * MIDDLEWARE

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", authRoute);
app.use("/api", collectionRoute);
app.use("/api", taskRoute);
app.use(errrorHandler);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
