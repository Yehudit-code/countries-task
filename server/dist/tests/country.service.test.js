"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countryImport_service_1 = require("../services/countryImport.service");
const country_model_1 = require("../models/country.model");
jest.mock("../models/country.model");
describe("importCountriesIfEmpty", () => {
    it("should not import countries if database is not empty", async () => {
        country_model_1.Country.countDocuments.mockResolvedValue(5);
        const result = await (0, countryImport_service_1.importCountriesIfEmpty)();
        expect(result.imported).toBe(false);
    });
});
