import { Request, Response } from "express";
import { updateUserPermission } from "../services/adminPermissions.service";

export const updatePermissionController = async (
  req: Request,
  res: Response
) => {
  const { userId, permission, value } = req.body;

  await updateUserPermission(userId, permission, value);

  res.status(200).json({ message: "Permission updated" });
};
