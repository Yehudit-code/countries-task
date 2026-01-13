import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserState } from "../../store/auth.store";

export default function AuthGuard() {
  const user = useRecoilValue(authUserState);

  // auth state still loading
  if (user === undefined) {
    return null;
  }

  // not logged in → landing page
  if (!user) {
    return <Navigate to="/access" replace />;
  }

  return <Outlet />;
}
