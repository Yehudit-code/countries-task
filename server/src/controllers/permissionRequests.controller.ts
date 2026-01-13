import { Request, Response } from "express";
import { PermissionRequest } from "../models/permissionRequest.model";
import { updateUserPermission } from "../services/adminPermissions.service";

export const approveRequest = async (req: Request, res: Response) => {
  const request = await PermissionRequest.findById(req.params.id);
  if (!request) return res.sendStatus(404);

  await updateUserPermission(
    request.user.toString(),
    request.permission,
    request.action === "grant"
  );

  request.status = "approved";
  await request.save();

  res.json({ message: "Request approved" });
};

export const rejectRequest = async (req: Request, res: Response) => {
  await PermissionRequest.findByIdAndUpdate(req.params.id, {
    status: "rejected",
  });

  res.json({ message: "Request rejected" });
};

export const getPermissionRequestsController = async (
  _req: Request,
  res: Response
) => {
  const requests = await PermissionRequest.find()
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });

  res.status(200).json(requests);
};
