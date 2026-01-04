// src/hooks/useCountriesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../api/countries.api"; 
import type { Country } from "../types/country";

export const useCountriesQuery = () =>
  useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5,
  });
