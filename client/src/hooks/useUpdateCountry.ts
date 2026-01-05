import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCountry } from "../api/countries.api";
import type { Country } from "../types/country";

type UpdateCountryInput = {
  id: string;
  data: Partial<Country>;
};

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();

  return useMutation<Country, Error, UpdateCountryInput>({
    mutationFn: updateCountry,

    onSuccess: (updatedCountry) => {
      queryClient.setQueryData<Country[]>(
        ["countries"],
        (old = []) =>
          old.map((c) =>
            c._id === updatedCountry._id ? updatedCountry : c
          )
      );
    },
  });
};
