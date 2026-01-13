import { Routes, Route } from "react-router-dom";
import PermissionsPage from "./pages/admin/PermissionsPage";
import UserProfilePage from "./pages/admin/UserProfilePageByAdmin";
import PermissionRequestsPage from "./pages/admin/PermissionRequestsPage";


export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="permissions" element={<PermissionsPage />} />
      <Route path="users/:id" element={<UserProfilePage />} />
      <Route path="requests" element={<PermissionRequestsPage />} />
    </Routes>
  );
}
