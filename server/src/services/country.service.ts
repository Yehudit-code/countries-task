import { Country } from "../models/country.model";

export const getAllCountries = async () => {
  const countries = await Country.find().sort({ name: 1 });
  return countries;
};

export const getCountryById = async (id: string) => {
  const country = await Country.findById(id);
  return country;
};

export const updateCountryById = async (
  id: string,
  updateData: {
    name?: string;
    flag?: string;
    population?: number;
    region?: string;
  }
) => {
  const updatedCountry = await Country.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );

  return updatedCountry;
};

export const deleteCountryById = async (id: string) => {
  const deletedCountry = await Country.findByIdAndDelete(id);
  return deletedCountry;
};