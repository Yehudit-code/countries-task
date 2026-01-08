"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountryController = exports.updateCountryController = exports.getCountryByIdController = exports.getCountriesController = exports.createCountryController = void 0;
const country_service_1 = require("../services/country.service");
const catchAsync_1 = require("../utils/catchAsync");
const messages_1 = require("../constants/messages");
/**
 * Create country
 */
exports.createCountryController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    try {
        const country = await (0, country_service_1.createCountry)(req.body);
        res.status(201).json(country);
    }
    catch (error) {
        // Mongo duplicate key (unique index)
        if (error.code === 11000) {
            const err = new Error(messages_1.SERVER_ERROR_MESSAGES.COUNTRY_ALREADY_EXISTS);
            err.statusCode = 409;
            throw err;
        }
        const err = new Error(messages_1.SERVER_ERROR_MESSAGES.COUNTRY_CREATE_FAILED);
        err.statusCode = 400;
        throw err;
    }
});
/**
 * Get all countries
 */
exports.getCountriesController = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const countries = await (0, country_service_1.getAllCountries)();
    res.status(200).json(countries);
});
/**
 * Get country by id
 */
exports.getCountryByIdController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const country = await (0, country_service_1.getCountryById)(id);
    if (!country) {
        const err = new Error(messages_1.SERVER_ERROR_MESSAGES.COUNTRY_NOT_FOUND);
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(country);
});
/**
 * Update country
 */
exports.updateCountryController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCountry = await (0, country_service_1.updateCountryById)(id, updateData);
    if (!updatedCountry) {
        const err = new Error(messages_1.SERVER_ERROR_MESSAGES.COUNTRY_NOT_FOUND);
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(updatedCountry);
});
/**
 * Delete country
 */
exports.deleteCountryController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const deletedCountry = await (0, country_service_1.deleteCountryById)(id);
    if (!deletedCountry) {
        const err = new Error(messages_1.SERVER_ERROR_MESSAGES.COUNTRY_NOT_FOUND);
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json({
        message: messages_1.SERVER_SUCCESS_MESSAGES.COUNTRY_DELETED,
    });
});
