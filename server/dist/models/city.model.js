"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const mongoose_1 = require("mongoose");
/**
 * City schema
 * Represents a city that belongs to a country
 */
const CitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: mongoose_1.Types.ObjectId,
        ref: "Country",
        required: true,
    },
}, {
    timestamps: true,
});
exports.City = (0, mongoose_1.model)("City", CitySchema);
