import { Request, Response } from "express";
import { importCountriesIfEmpty } from "../services/countryImport.service";
import { catchAsync } from "../utils/catchAsync";

/**
 * Import countries from external API (only if DB is empty)
 */
export const importCountriesController = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await importCountriesIfEmpty();
    res.status(200).json(result);
  }
);
