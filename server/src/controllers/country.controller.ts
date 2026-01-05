import { Request, Response } from "express";
import {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
} from "../services/country.service";
import { catchAsync } from "../utils/catchAsync";

import {
  SERVER_SUCCESS_MESSAGES,
  SERVER_ERROR_MESSAGES,
} from "../constants/messages";

/**
 * Create country
 */
export const createCountryController = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const country = await createCountry(req.body);

      res.status(201).json(country);
    } catch (error: any) {
      // Mongo duplicate key (unique index)
      if (error.code === 11000) {
        const err = new Error(
          SERVER_ERROR_MESSAGES.COUNTRY_ALREADY_EXISTS
        );
        (err as any).statusCode = 409;
        throw err;
      }

      const err = new Error(
        SERVER_ERROR_MESSAGES.COUNTRY_CREATE_FAILED
      );
      (err as any).statusCode = 400;
      throw err;
    }
  }
);

/**
 * Get all countries
 */
export const getCountriesController = catchAsync(
  async (_req: Request, res: Response) => {
    const countries = await getAllCountries();
    res.status(200).json(countries);
  }
);

/**
 * Get country by id
 */
export const getCountryByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const country = await getCountryById(id);

    if (!country) {
      const err = new Error(
        SERVER_ERROR_MESSAGES.COUNTRY_NOT_FOUND
      );
      (err as any).statusCode = 404;
      throw err;
    }

    res.status(200).json(country);
  }
);

/**
 * Update country
 */
export const updateCountryController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCountry = await updateCountryById(id, updateData);

    if (!updatedCountry) {
      const err = new Error(
        SERVER_ERROR_MESSAGES.COUNTRY_NOT_FOUND
      );
      (err as any).statusCode = 404;
      throw err;
    }

    res.status(200).json(updatedCountry);
  }
);

/**
 * Delete country
 */
export const deleteCountryController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCountry = await deleteCountryById(id);

    if (!deletedCountry) {
      const err = new Error(
        SERVER_ERROR_MESSAGES.COUNTRY_NOT_FOUND
      );
      (err as any).statusCode = 404;
      throw err;
    }

    res.status(200).json({
      message: SERVER_SUCCESS_MESSAGES.COUNTRY_DELETED,
    });
  }
);
