import { Request, Response, NextFunction } from "express";

type PermissionType = "create" | "update" | "delete";

export const requirePermission = (permission: PermissionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
