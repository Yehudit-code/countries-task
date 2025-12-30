import { Router } from "express";
import { importCountriesController } from "../controllers/countryImport.controller";
import { deleteCountryController, getCountriesController, getCountryByIdController, updateCountryController } from "../controllers/country.controller";

const router = Router();

router.post("/import", importCountriesController);
router.get("/", getCountriesController);
router.get("/:id", getCountryByIdController);
router.put("/:id", updateCountryController);
router.delete("/:id", deleteCountryController);
export default router;
