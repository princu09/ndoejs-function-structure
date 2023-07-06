import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import allRoutes from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT;
const BaseURL = process.env.BaseURL || "http://localhost";

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// allow all cors here
app.use(
  cors({
    origin: ["http://localhost:5173", "*", "http://localhost:3000"],
  })
);

app.use("/api", allRoutes);

server.listen(PORT, () =>
  console.log(`Server running on port: ${BaseURL}:${PORT}`)
);
