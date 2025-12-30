import { Request, Response } from "express";
import { importCountriesIfEmpty } from "../services/countryImport.service";

export const importCountriesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await importCountriesIfEmpty();
    res.status(200).json(result);
  } catch (error) {
    console.error("Import countries failed", error);
    res.status(500).json({
      message: "Failed to import countries"
    });
  }
};
