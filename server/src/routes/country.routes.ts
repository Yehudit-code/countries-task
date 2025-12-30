import { Router } from "express";
import { importCountriesController } from "../controllers/countryImport.controller";

const router = Router();

router.post("/import", importCountriesController);

export default router;
