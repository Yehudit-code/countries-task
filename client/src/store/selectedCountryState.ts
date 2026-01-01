import { atom } from "recoil";

export const selectedCountryNameState = atom<string | null>({
  key: "selectedCountryNameState",
  default: null,
});