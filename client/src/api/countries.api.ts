import axios from "axios";
import type { Country } from "../types/country";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Import countries if the database is empty
 */
export async function importCountriesIfEmpty(): Promise<void> {
  await axios.post(`${BASE_URL}/countries/import`);
}

/**
 * Fetch all countries
 */
export async function fetchCountries(): Promise<Country[]> {
  const res = await axios.get<Country[]>(`${BASE_URL}/countries`);
  return res.data;
}

/**
 * Get country by id
 */
export async function getCountryById(id: string): Promise<Country> {
  const res = await axios.get<Country>(`${BASE_URL}/countries/${id}`);
  return res.data;
}

/**
 * Create new country
 */
export async function createCountry(
  data: Partial<Country>
): Promise<Country> {
  const res = await axios.post<Country>(`${BASE_URL}/countries`, data);
  return res.data;
}

/**
 * Update country by id
 */
export async function updateCountry(
  id: string,
  data: Partial<Country>
): Promise<Country> {
  const res = await axios.put<Country>(`${BASE_URL}/countries/${id}`, data);
  return res.data;
}

/**
 * Delete country by id
 */
export async function deleteCountry(id: string): Promise<void> {
  await axios.delete(`${BASE_URL}/countries/${id}`);
}
