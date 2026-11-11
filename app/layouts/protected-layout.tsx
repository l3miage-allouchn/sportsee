import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import Header from "~/components/Header";

export default function ProtectedLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
