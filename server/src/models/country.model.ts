import { Schema, model, Document } from "mongoose";

export interface CountryDocument extends Document {
  name: string;
  flag: string;
  population: number;
  region: string;
}

const CountrySchema = new Schema<CountryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    flag: {
      type: String,
      required: true
    },
    population: {
      type: Number,
      required: true
    },
    region: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Country = model<CountryDocument>("Country", CountrySchema);
