import { useAuthContext } from "../../context/useAuthContext";
import { Navigate } from "react-router-dom";

type AdminRouteProps = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, user } = useAuthContext();

  // Jika user sudah dimuat dan bukan admin, redirect ke halaman utama
  if (user && !isAdmin) {
    return <Navigate to="/mahasiswa" replace />;
  }

  return <>{children}</>;
}
