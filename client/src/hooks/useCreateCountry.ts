import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCountry } from "../api/countries.api";
import type { Country } from "../types/country";

export function useCreateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Country, "_id">) => createCountry(data),
    onSuccess: () => {
      // Refresh countries list after creating a new country
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
}
