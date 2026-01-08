import { Schema, model, Types } from "mongoose";

/**
 * City schema
 * Represents a city that belongs to a country
 */
const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const City = model("City", CitySchema);
