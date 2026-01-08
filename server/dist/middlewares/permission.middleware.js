"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = void 0;
const requirePermission = (permission) => {
    return (req, res, next) => {
        // User must be authenticated first
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Admin bypasses all permission checks
        if (req.user.role === "admin") {
            return next();
        }
        // Check specific permission for regular users
        if (!req.user.permissions?.[permission]) {
            return res.status(403).json({
                message: `Permission '${permission}' is required`
            });
        }
        next();
    };
};
exports.requirePermission = requirePermission;
