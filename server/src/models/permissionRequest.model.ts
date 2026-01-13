import { Schema, model, Document, Types } from "mongoose";

export type PermissionAction = "grant" | "revoke";
export type RequestStatus = "pending" | "approved" | "rejected";

export interface PermissionRequestDocument extends Document {
  user: Types.ObjectId;
  permission: "create" | "update" | "delete";
  action: PermissionAction;
  status: RequestStatus;
}

const PermissionRequestSchema = new Schema<PermissionRequestDocument>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  permission: { type: String, required: true },
  action: { type: String, required: true },
  status: { type: String, default: "pending" },
});

export const PermissionRequest = model<PermissionRequestDocument>(
  "PermissionRequest",
  PermissionRequestSchema
);
