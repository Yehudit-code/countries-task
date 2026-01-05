import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCountry } from "../api/countries.api";
import type { Country } from "../types/country";

export const useCreateCountry = () => {
  const queryClient = useQueryClient();

  return useMutation<Country, Error, Partial<Country>>({
    mutationFn: createCountry,

    onSuccess: (newCountry) => {
      queryClient.setQueryData<Country[]>(
        ["countries"],
        (old = []) => [...old, newCountry]
      );
    },
  });
};
