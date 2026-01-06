import api from "./axios";
import type { Country } from "../types/country";

/**
 * Import countries if the database is empty (admin only)
 */
export async function importCountriesIfEmpty(): Promise<void> {
  await api.post("/countries/import");
}

/**
 * Fetch all countries
 */
export async function fetchCountries(): Promise<Country[]> {
  const res = await api.get<Country[]>("/api/countries");
  return res.data;
}

/**
 * Get country by id
 */
export async function getCountryById(id: string): Promise<Country> {
  const res = await api.get<Country>(`/countries/${id}`);
  return res.data;
}

/**
 * Create new country
 */
export async function createCountry(
  data: Partial<Country>
): Promise<Country> {
  const res = await api.post<Country>("/countries", data);
  return res.data;
}

/**
 * Update country by id
 */
export async function updateCountry({
  id,
  data,
}: {
  id: string;
  data: Partial<Country>;
}): Promise<Country> {
  const res = await api.put<Country>(`/countries/${id}`, data);
  return res.data;
}

/**
 * Delete country by id
 */
export async function deleteCountry(id: string): Promise<void> {
  await api.delete(`/countries/${id}`);
}
