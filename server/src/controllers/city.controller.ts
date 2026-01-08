import { Request, Response } from "express";
import { createCity, deleteCity, getAllCities, getCitiesByCountry, getCityById, updateCity } from "../services/city.service";
import { catchAsync } from "../utils/catchAsync";

/**
 * Create city
 */
export const createCityController = catchAsync(
  async (req: Request, res: Response) => {
    const { countryId, name } = req.body;

    const city = await createCity(countryId, name);
    res.status(201).json(city);
  }
);

/**
 * Get all cities
 */
export const getAllCitiesController = catchAsync(
  async (_req: Request, res: Response) => {
    const cities = await getAllCities();
    res.status(200).json(cities);
  }
);


/**
 * Get cities by country
 */
export const getCitiesByCountryController = catchAsync(
  async (req: Request, res: Response) => {
    const { countryId } = req.params;

    const cities = await getCitiesByCountry(countryId);
    res.status(200).json(cities);
  }
);

/**
 * Get city by ID
 */
export const getCityByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { cityId } = req.params;

    const city = await getCityById(cityId);
    res.status(200).json(city);
  }
);

/**
 * Update city
 */
export const updateCityController = catchAsync(
  async (req: Request, res: Response) => {
    const { cityId } = req.params;
    const { name } = req.body;

    const city = await updateCity(cityId, name);
    res.status(200).json(city);
  }
);

/**
 * Delete city
 */
export const deleteCityController = catchAsync(
  async (req: Request, res: Response) => {
    const { cityId } = req.params;

    await deleteCity(cityId);

    res.status(200).json({
      message: "City deleted successfully",
    });
  }
);

