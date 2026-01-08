"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.getCityById = exports.getCitiesByCountry = exports.getAllCities = exports.createCity = void 0;
const city_model_1 = require("../models/city.model");
const country_model_1 = require("../models/country.model");
/**
 * Creates a new city and attaches it to a country
 */
const createCity = async (countryId, name) => {
    // Validate country existence
    const country = await country_model_1.Country.findById(countryId);
    if (!country) {
        throw new Error("Country not found");
    }
    // Create city
    const city = await city_model_1.City.create({
        name,
        country: countryId,
    });
    // Attach city to country
    country.cities.push(city._id);
    await country.save();
    return city;
};
exports.createCity = createCity;
/**
 * Get all cities
 */
const getAllCities = async () => {
    return city_model_1.City.find();
};
exports.getAllCities = getAllCities;
/**
 * Get all cities for a specific country
 */
const getCitiesByCountry = async (countryId) => {
    return city_model_1.City.find({ country: countryId });
};
exports.getCitiesByCountry = getCitiesByCountry;
/**
 * Get city by ID
 */
const getCityById = async (cityId) => {
    const city = await city_model_1.City.findById(cityId);
    if (!city) {
        throw new Error("City not found");
    }
    return city;
};
exports.getCityById = getCityById;
/**
 * Update city name
 */
const updateCity = async (cityId, name) => {
    const city = await city_model_1.City.findByIdAndUpdate(cityId, { name }, { new: true });
    if (!city) {
        throw new Error("City not found");
    }
    return city;
};
exports.updateCity = updateCity;
/**
 * Delete city and remove reference from country
 */
const deleteCity = async (cityId) => {
    const city = await city_model_1.City.findById(cityId);
    if (!city) {
        throw new Error("City not found");
    }
    await country_model_1.Country.findByIdAndUpdate(city.country, {
        $pull: { cities: city._id },
    });
    await city.deleteOne();
};
exports.deleteCity = deleteCity;
