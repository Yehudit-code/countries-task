import { Router } from "express";
import { importCountriesController } from "../controllers/countryImport.controller";
import { createCountryController, getCountriesController, getCountryByIdController, updateCountryController, deleteCountryController } from "../controllers/country.controller";

const router = Router();

router.post("/import", importCountriesController);

router.post("/", createCountryController);
router.get("/", getCountriesController);
router.get("/:id", getCountryByIdController);
router.put("/:id", updateCountryController);
router.delete("/:id", deleteCountryController);
export default router;
