import { useMutation } from "@tanstack/react-query";
import { updateMyProfile } from "../api/users.api";

export const useUpdateMyProfile = () =>
  useMutation({
    mutationFn: (formData: FormData) => updateMyProfile(formData),
  });
