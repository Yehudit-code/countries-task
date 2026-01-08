import { Router } from "express";
import {
    createCityController,
    deleteCityController,
    getAllCitiesController,
  getCitiesByCountryController,
  getCityByIdController,
  updateCityController,
} from "../controllers/city.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router();

router.use(authenticate, isAdmin);

router.post("/", createCityController);
router.get("/", getAllCitiesController);
router.get("/country/:countryId", getCitiesByCountryController);
router.get("/:cityId", getCityByIdController);
router.put("/:cityId", updateCityController);
router.delete("/:cityId", deleteCityController);

export default router;
