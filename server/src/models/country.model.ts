import { Schema, model, Document, Types } from "mongoose";

export interface CountryDocument extends Document {
  name: string;
  flag: string;
  population: number;
  region: string;
  cities: Types.ObjectId[];
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
    },
    cities: [
      {
        type: Types.ObjectId,
        ref: "City",
      },
    ],
  },
  {
    timestamps: true
  }
);

export const Country = model<CountryDocument>("Country", CountrySchema);
