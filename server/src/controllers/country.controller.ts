import { Request, Response } from "express";
import { deleteCountryById, getAllCountries, getCountryById, updateCountryById  } from "../services/country.service";

export const getCountriesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const countries = await getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    console.error("Failed to fetch countries", error);
    res.status(500).json({
      message: "Failed to fetch countries"
    });
  }
};

export const getCountryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const country = await getCountryById(id);

    if (!country) {
      return res.status(404).json({
        message: "Country not found"
      });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error("Failed to fetch country by id", error);
    res.status(400).json({
      message: "Invalid country id"
    });
  }
};

export const updateCountryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCountry = await updateCountryById(id, updateData);

    if (!updatedCountry) {
      return res.status(404).json({
        message: "Country not found"
      });
    }

    res.status(200).json(updatedCountry);
  } catch (error) {
    console.error("Failed to update country", error);
    res.status(400).json({
      message: "Invalid data or country id"
    });
  }
};

export const deleteCountryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedCountry = await deleteCountryById(id);

    if (!deletedCountry) {
      return res.status(404).json({
        message: "Country not found"
      });
    }

    res.status(200).json({
      message: "Country deleted successfully"
    });
  } catch (error) {
    console.error("Failed to delete country", error);
    res.status(400).json({
      message: "Invalid country id"
    });
  }
};