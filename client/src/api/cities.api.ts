import api from "./axios";

/**
 * Get all cities for a specific country
 */
export const getCitiesByCountry = async (countryId: string) => {
  const res = await api.get(`/cities/country/${countryId}`);
  return res.data;
};

/**
 * Get city by ID
 */
export const getCityById = async (cityId: string) => {
  const res = await api.get(`/cities/${cityId}`);
  return res.data;
};

/**
 * Create a new city
 */
export const createCity = async (countryId: string, name: string) => {
  const res = await api.post("/cities", { countryId, name });
  return res.data;
};

/**
 * Update city name
 */
export const updateCity = async (cityId: string, name: string) => {
  const res = await api.put(`/cities/${cityId}`, { name });
  return res.data;
};

/**
 * Delete city
 */
export const deleteCity = async (cityId: string) => {
  const res = await api.delete(`/cities/${cityId}`);
  return res.data;
};
