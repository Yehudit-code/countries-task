"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const mongoose_1 = require("mongoose");
const CountrySchema = new mongoose_1.Schema({
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
            type: mongoose_1.Types.ObjectId,
            ref: "City",
        },
    ],
}, {
    timestamps: true
});
exports.Country = (0, mongoose_1.model)("Country", CountrySchema);
