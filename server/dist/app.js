"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const country_routes_1 = __importDefault(require("./routes/country.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const city_routes_1 = __importDefault(require("./routes/city.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
// routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/countries", country_routes_1.default);
app.use("/api/cities", city_routes_1.default);
app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
// global error handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
