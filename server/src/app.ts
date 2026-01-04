import express from "express";
import cors from "cors";
import countryRoutes from "./routes/country.routes";
import countryImportRoutes from "../src/routes/country.routes";
import { errorHandler } from "../src/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/countries", countryRoutes);
app.use("/countries/import", countryImportRoutes);

app.use(errorHandler);

export default app;
