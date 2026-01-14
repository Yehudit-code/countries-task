import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserState } from "../../store/auth.store";

export default function AdminGuard() {
  const user = useRecoilValue(authUserState);

  // still checking auth
  if (user === undefined) {
    return null; // or spinner
  }

  // not logged in
  if (user === null) {
    return <Navigate to="/access" replace />;
  }

  // logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // admin
  return <Outlet />;
}
