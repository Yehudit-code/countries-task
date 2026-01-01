import * as Yup from "yup";

export const countrySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  region: Yup.string().required("Region is required"),
  population: Yup.number()
    .typeError("Population must be a number")
    .positive("Population must be positive")
    .required("Population is required"),
  flag: Yup.string().url("Flag must be a valid URL").required("Flag is required"),
});
