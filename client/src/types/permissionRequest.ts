export interface PermissionRequest {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  permission: "create" | "update" | "delete";
  action: "grant" | "revoke";
  status: "pending" | "approved" | "rejected";
}
