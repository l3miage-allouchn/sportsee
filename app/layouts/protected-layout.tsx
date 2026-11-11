import { Navigate, Outlet } from "react-router";
import { getToken } from "~/utils/cookies";

export default function ProtectedLayout() {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
