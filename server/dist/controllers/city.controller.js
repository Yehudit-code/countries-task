"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityController = exports.updateCityController = exports.getCityByIdController = exports.getCitiesByCountryController = exports.getAllCitiesController = exports.createCityController = void 0;
const city_service_1 = require("../services/city.service");
const catchAsync_1 = require("../utils/catchAsync");
/**
 * Create city
 */
exports.createCityController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { countryId, name } = req.body;
    const city = await (0, city_service_1.createCity)(countryId, name);
    res.status(201).json(city);
});
/**
 * Get all cities
 */
exports.getAllCitiesController = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const cities = await (0, city_service_1.getAllCities)();
    res.status(200).json(cities);
});
/**
 * Get cities by country
 */
exports.getCitiesByCountryController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { countryId } = req.params;
    const cities = await (0, city_service_1.getCitiesByCountry)(countryId);
    res.status(200).json(cities);
});
/**
 * Get city by ID
 */
exports.getCityByIdController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { cityId } = req.params;
    const city = await (0, city_service_1.getCityById)(cityId);
    res.status(200).json(city);
});
/**
 * Update city
 */
exports.updateCityController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { cityId } = req.params;
    const { name } = req.body;
    const city = await (0, city_service_1.updateCity)(cityId, name);
    res.status(200).json(city);
});
/**
 * Delete city
 */
exports.deleteCityController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { cityId } = req.params;
    await (0, city_service_1.deleteCity)(cityId);
    res.status(200).json({
        message: "City deleted successfully",
    });
});
