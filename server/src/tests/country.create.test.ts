import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { Country } from "../models/country.model";

describe("POST /countries", () => {
  // connect to DB once before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  // clean collection before each test
  beforeEach(async () => {
    await Country.deleteMany({});
  });

  // close DB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new country successfully", async () => {
    const newCountry = {
      name: "Testland",
      region: "Europe",
      population: 123456,
      flag: "https://flag.test/testland.png",
    };

    const response = await request(app)
      .post("/countries")
      .send(newCountry);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Testland");
    expect(response.body.region).toBe("Europe");

    const countryInDb = await Country.findOne({ name: "Testland" });
    expect(countryInDb).not.toBeNull();
  });

  it("should return 409 if country already exists", async () => {
    await Country.create({
      name: "Duplicateland",
      region: "Asia",
      population: 500000,
      flag: "https://flag.test/duplicate.png",
    });

    const response = await request(app)
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
