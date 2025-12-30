import { importCountriesIfEmpty } from "../services/countryImport.service";
import { Country } from "../models/country.model";

jest.mock("../models/country.model");

describe("importCountriesIfEmpty", () => {
  it("should not import countries if database is not empty", async () => {
    (Country.countDocuments as jest.Mock).mockResolvedValue(5);

    const result = await importCountriesIfEmpty();

    expect(result.imported).toBe(false);
  });
});
