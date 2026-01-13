export interface PermissionRequest {
  _id: string;
  status: PermissionStatus;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
  permission: string;
  action: string;
}

export type PermissionStatus =
  | "pending"
  | "approved"
  | "rejected";
