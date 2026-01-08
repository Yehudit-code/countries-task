"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCountriesController = void 0;
const countryImport_service_1 = require("../services/countryImport.service");
const catchAsync_1 = require("../utils/catchAsync");
/**
 * Import countries from external API (only if DB is empty)
 */
exports.importCountriesController = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await (0, countryImport_service_1.importCountriesIfEmpty)();
    res.status(200).json(result);
});
