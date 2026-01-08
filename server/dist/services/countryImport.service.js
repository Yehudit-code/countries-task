"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCountriesIfEmpty = void 0;
const axios_1 = __importDefault(require("axios"));
const country_model_1 = require("../models/country.model");
const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all/?fields=name,flags,population,region";
const importCountriesIfEmpty = async () => {
    const existingCount = await country_model_1.Country.countDocuments();
    if (existingCount > 0) {
        return {
            imported: false,
            message: "Countries already exist in database"
        };
    }
    const response = await axios_1.default.get(COUNTRIES_API_URL);
    const countriesData = response.data.map((country) => ({
        name: country.name?.common,
        flag: country.flags?.png,
        population: country.population,
        region: country.region
    }));
    await country_model_1.Country.insertMany(countriesData);
    return {
        imported: true,
        count: countriesData.length
    };
};
exports.importCountriesIfEmpty = importCountriesIfEmpty;
