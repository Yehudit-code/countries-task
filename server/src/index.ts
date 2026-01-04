import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { importCountriesIfEmpty } from "./services/countryImport.service";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();             
    await importCountriesIfEmpty();
    app.listen(PORT, () => {       
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
