import { City } from "../models/city.model";
import { Country } from "../models/country.model";

/**
 * Creates a new city and attaches it to a country
 */
export const createCity = async (countryId: string, name: string) => {
    // Validate country existence
    const country = await Country.findById(countryId);
    if (!country) {
        throw new Error("Country not found");
    }

    // Create city
    const city = await City.create({
        name,
        country: countryId,
    });

    // Attach city to country
    country.cities.push(city._id);
    await country.save();

    return city;
};

/**
 * Get all cities
 */
export const getAllCities = async () => {
  return City.find();
};


/**
 * Get all cities for a specific country
 */
export const getCitiesByCountry = async (countryId: string) => {
  return City.find({ country: countryId });
};

/**
 * Get city by ID
 */
export const getCityById = async (cityId: string) => {
  const city = await City.findById(cityId);

  if (!city) {
    throw new Error("City not found");
  }

  return city;
};

/**
 * Update city name
 */
export const updateCity = async (cityId: string, name: string) => {
  const city = await City.findByIdAndUpdate(
    cityId,
    { name },
    { new: true }
  );

  if (!city) {
    throw new Error("City not found");
  }

  return city;
};

/**
 * Delete city and remove reference from country
 */
export const deleteCity = async (cityId: string) => {
    const city = await City.findById(cityId);
    if (!city) {
        throw new Error("City not found");
    }

    await Country.findByIdAndUpdate(city.country, {
        $pull: { cities: city._id },
    });

    await city.deleteOne();
};

