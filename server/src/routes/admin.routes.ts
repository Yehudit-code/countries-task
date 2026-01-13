import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/adminUsers.controller";

import { updatePermissionController } from "../controllers/adminPermissions.controller";

import {
  getPermissionRequestsController,
  approveRequest,
  rejectRequest,
} from "../controllers/permissionRequests.controller";

const router = Router();

/* Users */
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.put("/users/:id", updateUserController);

/* Permissions (checkboxes) */
router.patch("/permissions", updatePermissionController);

/* Permission Requests */
router.get("/permission-requests", getPermissionRequestsController);
router.post("/permission-requests/:id/approve", approveRequest);
router.post("/permission-requests/:id/reject", rejectRequest);

export default router;
