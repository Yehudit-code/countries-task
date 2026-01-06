import { Router } from "express";
import { importCountriesController } from "../controllers/countryImport.controller";
import {
  createCountryController,
  getCountriesController,
  getCountryByIdController,
  updateCountryController,
  deleteCountryController
} from "../controllers/country.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permission.middleware";

const router = Router();

router.post(
  "/import",
  authenticate,
  requirePermission("create"),
  importCountriesController
);

router.post(
  "/",
  authenticate,
  requirePermission("create"),
  createCountryController
);

router.get(
  "/",
  authenticate,
  getCountriesController
);

router.get(
  "/:id",
  authenticate,
  getCountryByIdController
);

router.put(
  "/:id",
  authenticate,
  requirePermission("update"),
  updateCountryController
);

router.delete(
  "/:id",
  authenticate,
  requirePermission("delete"),
  deleteCountryController
);

export default router;
