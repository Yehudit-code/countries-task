import { Country, CountryDocument } from "../models/country.model";

export const createCountry = async (
  data: {
    name: string;
    flag: string;
    population: number;
    region: string;
  }
): Promise<CountryDocument> => {
  const country = await Country.create(data);
  return country;
};

export const getAllCountries = async () => {
  return Country.find().sort({ name: 1 });
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