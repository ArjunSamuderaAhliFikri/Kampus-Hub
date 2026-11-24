import { useAuthContext } from "../../context/useAuthContext";
import { Navigate } from "react-router-dom";

type AdminRouteProps = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-slate-500 text-sm">Memeriksa hak akses...</p>
      </div>
    );
  }

  // Jika bukan admin, redirect ke halaman mahasiswa
  if (!isAdmin) {
    return <Navigate to="/mahasiswa" replace />;
  }

  return <>{children}</>;
}
