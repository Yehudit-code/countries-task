import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserState } from "../../store/auth.store";

export default function AdminGuard() {
    const user = useRecoilValue(authUserState);

    if (user === undefined) {
        return null;
    }

    if (user === null) {
        return <Navigate to="/access" replace />;
    }

    // not logged in → landing
    if (!user) {
        return <Navigate to="/access" replace />;
    }

    // logged in but not admin → main page
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
