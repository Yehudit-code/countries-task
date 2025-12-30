import type { Country } from "../types/country";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Import countries if the database is empty
 */
export async function importCountriesIfEmpty(): Promise<void> {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/countries/import`,
        {
            method: "POST",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to import countries");
    }
}


/**
 * Fetch countries from server and normalize MongoDB _id
 */
export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/countries`);
  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  return res.json();
}

/**
 * Delete country by id
 */
export async function deleteCountry(id: string): Promise<void> {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/countries/${id}`,
        { method: "DELETE" }
    );

    if (!res.ok) {
        throw new Error("Failed to delete country");
    }
}