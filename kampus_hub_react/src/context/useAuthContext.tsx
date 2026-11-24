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
  accessToken: string;
  setAccessToken: React.Dispatch<SetStateAction<string>>;
  user: UserType | null;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authService = AuthService();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const getRefreshAccessToken = async () => {
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (!storedRefreshToken) {
        if (!pathname.includes("/auth")) {
          navigate("/auth/login");
        }
        return;
      }

      try {
        const res = await authService.refreshToken(storedRefreshToken);

        if (res?.accessToken) {
          setAccessToken(res.accessToken);
          localStorage.setItem("accessToken", res.accessToken);
        }

        if (res?.user) {
          setUser(res.user);
          localStorage.setItem("userRole", res.user.role);
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
        setAccessToken("");
        setUser(null);

        if (!pathname.includes("/auth")) {
          navigate("/auth/login");
        }
      }
    };

    getRefreshAccessToken();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser, isAdmin }}
    >
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
