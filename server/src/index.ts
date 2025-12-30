import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import "./models/country.model";
import countryRoutes from "./routes/country.routes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/countries", countryRoutes);

connectDB();

app.get("/", (_req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
