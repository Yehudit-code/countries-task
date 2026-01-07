import express from "express";
import cors from "cors";
import path from "path";

import countryRoutes from "./routes/country.routes";
import authRoutes from "./routes/auth.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "uploads"))
);
// routes
app.use("/api/countries", countryRoutes);
app.use("/api/auth", authRoutes);

// global error handler
app.use(errorHandler);

export default app;
