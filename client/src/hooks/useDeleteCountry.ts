import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCountry } from "../api/countries.api";
import type { Country } from "../types/country";

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCountry,

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Country[]>(
        ["countries"],
        (old = []) => old.filter((c) => c._id !== deletedId)
      );
    },
  });
};
