import type { PermissionRequest } from "../types/permissionRequest";
import type { User } from "../types/user";
import api from "./axios";

/* USERS */
export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  return api.put(`/admin/users/${id}`, data);
};

/* PERMISSIONS */
export const updatePermission = async (payload: {
  userId: string;
  permission: "create" | "update" | "delete";
  value: boolean;
}) => {
  return api.patch("/admin/permissions", payload);
};

/* REQUESTS */
export const fetchPermissionRequests = async (): Promise<
  PermissionRequest[]
> => {
  const res = await api.get("/admin/permission-requests");
  return res.data;
};

export const approveRequest = async (id: string) => {
  return api.post(`/admin/permission-requests/${id}/approve`);
};

export const rejectRequest = async (id: string) => {
  return api.post(`/admin/permission-requests/${id}/reject`);
};
