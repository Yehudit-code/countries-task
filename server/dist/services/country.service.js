"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountryById = exports.updateCountryById = exports.getCountryById = exports.getAllCountries = exports.createCountry = void 0;
const country_model_1 = require("../models/country.model");
const createCountry = async (data) => {
    const country = await country_model_1.Country.create(data);
    return country;
};
exports.createCountry = createCountry;
const getAllCountries = async () => {
    return country_model_1.Country.find().sort({ name: 1 });
};
exports.getAllCountries = getAllCountries;
const getCountryById = async (id) => {
    const country = await country_model_1.Country.findById(id);
    return country;
};
exports.getCountryById = getCountryById;
const updateCountryById = async (id, updateData) => {
    const updatedCountry = await country_model_1.Country.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    return updatedCountry;
};
exports.updateCountryById = updateCountryById;
const deleteCountryById = async (id) => {
    const deletedCountry = await country_model_1.Country.findByIdAndDelete(id);
    return deletedCountry;
};
exports.deleteCountryById = deleteCountryById;
