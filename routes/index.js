import express from "express";
import authRoutes from "./authRoutes.js";
const app = express();

app.use("/auth", authRoutes);

export default app;