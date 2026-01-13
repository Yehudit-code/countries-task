import { User } from "../models/user.model";
import { PermissionRequest } from "../models/permissionRequest.model";

export const updateUserPermission = async (
  userId: string,
  permission: "create" | "update" | "delete",
  value: boolean
) => {
  // 1. Update user permission
  await User.findByIdAndUpdate(userId, {
    [`permissions.${permission}`]: value,
  });

  // 2. Sync pending requests
  await PermissionRequest.updateMany(
    {
      user: userId,
      permission,
      status: "pending",
    },
    { status: "approved" }
  );
};
