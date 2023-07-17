import express from "express";
import authRoutes from "./authRoutes.js";
import allRoutes from "./allRoutes.js";
const app = express();

app.use("/auth", authRoutes);

app.use("/", allRoutes);

export default app;
