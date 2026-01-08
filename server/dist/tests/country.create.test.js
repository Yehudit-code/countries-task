"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
const country_model_1 = require("../models/country.model");
describe("POST /countries", () => {
    // connect to DB once before all tests
    beforeAll(async () => {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    });
    // clean collection before each test
    beforeEach(async () => {
        await country_model_1.Country.deleteMany({});
    });
    // close DB connection after all tests
    afterAll(async () => {
        await mongoose_1.default.connection.close();
    });
    it("should create a new country successfully", async () => {
        const newCountry = {
            name: "Testland",
            region: "Europe",
            population: 123456,
            flag: "https://flag.test/testland.png",
        };
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/countries")
            .send(newCountry);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Testland");
        expect(response.body.region).toBe("Europe");
        const countryInDb = await country_model_1.Country.findOne({ name: "Testland" });
        expect(countryInDb).not.toBeNull();
    });
    it("should return 409 if country already exists", async () => {
        await country_model_1.Country.create({
            name: "Duplicateland",
            region: "Asia",
            population: 500000,
            flag: "https://flag.test/duplicate.png",
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/countries")
            .send({
            name: "Duplicateland",
            region: "Asia",
            population: 500000,
            flag: "https://flag.test/duplicate.png",
        });
        expect(response.status).toBe(409);
        expect(response.body.message).toMatch(/already exists/i);
    });
});
