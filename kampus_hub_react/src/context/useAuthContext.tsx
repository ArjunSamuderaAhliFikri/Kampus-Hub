import {
  createContext,
  useContext,
  useEffect,
  useState,
  type SetStateAction,
} from "react";
import { AuthService } from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";

type UserType = {
  userId?: string;
  username: string;
  role: "admin" | "mahasiswa";
};

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authService = AuthService();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check on auth pages
      if (pathname.includes("/auth")) {
        setIsLoading(false);
        return;
      }

      try {
        // 1. Coba langsung GET /auth/me (pakai access_token cookie)
        const res = await authService.getMe();

        if (res?.user) {
          setUser(res.user);
          setIsLoading(false);
          return;
        }
      } catch {
        // Access token expired atau tidak ada — coba refresh
      }

      try {
        // 2. Access token expired → panggil refresh-token (pakai refresh_token cookie)
        const refreshRes = await authService.refreshToken();

        if (refreshRes?.user) {
          setUser(refreshRes.user);
          setIsLoading(false);
          return;
        }
      } catch {
        // Refresh token juga gagal — user harus login ulang
      }

      // 3. Semua gagal → redirect ke login
      setUser(null);
      setIsLoading(false);
      navigate("/auth/login");
    };

    checkAuth();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
}
