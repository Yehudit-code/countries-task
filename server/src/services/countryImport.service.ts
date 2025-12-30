import axios from "axios";
import { Country } from "../models/country.model";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all/?fields=name,flags,population,region";

export const importCountriesIfEmpty = async () => {
  const existingCount = await Country.countDocuments();

  if (existingCount > 0) {
    return {
      imported: false,
      message: "Countries already exist in database"
    };
  }

  const response = await axios.get(COUNTRIES_API_URL);

  const countriesData = response.data.map((country: any) => ({
    name: country.name?.common,
    flag: country.flags?.png,
    population: country.population,
    region: country.region
  }));

  await Country.insertMany(countriesData);

  return {
    imported: true,
    count: countriesData.length
  };
};
