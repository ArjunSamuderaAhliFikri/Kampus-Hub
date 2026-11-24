import { useState } from "react";
import type { BodyRequest, RegisterRequest } from "../types/AuthType";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export function useAuthPresenter() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nim, setNim] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [enabledWarning, setEnabledWarning] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();
  const authService = AuthService();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await authService.login({
        username,
        password,
      } as BodyRequest);

      if (res?.error) {
        setError(res.error);
        setEnabledWarning(true);
        return;
      }

      if (res?.user) {
        // Token sudah disimpan di httpOnly cookie oleh backend
        // Tidak perlu localStorage sama sekali!

        setError("");
        setEnabledWarning(false);
        setIsLogin(true);

        alert(res.message);
        navigate("/"); // Redirect ke dashboard
      }
    } catch (err: unknown) {
      console.error("Error from login auth : ", err);

      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat login!";

      setError(errorMessage);
      setIsLogin(false);
      setEnabledWarning(true);
    }
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await authService.register({
        username,
        password,
        nim,
      } as RegisterRequest);

      if (res?.error) {
        setError(res.error);
        setEnabledWarning(true);
        setSuccessMessage("");
        return;
      }

      if (res?.message) {
        setSuccessMessage(res.message);
        setError("");
        setEnabledWarning(false);

        alert(res.message);
        navigate("/auth/login");
      }
    } catch (err: unknown) {
      console.error("Error from register auth : ", err);

      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat registrasi!";

      setError(errorMessage);
      setSuccessMessage("");
      setEnabledWarning(true);
    }
  };

  const handleLogout = async () => {
    try {
      // Panggil backend logout — backend akan clear cookies & hapus token dari DB
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUsername("");
    setPassword("");
    setIsLogin(false);
    navigate("/auth/login");
  };

  const authValue = { username, password, nim };
  const authSetterValue = { setUsername, setPassword, setNim };

  return {
    authValue,
    authSetterValue,
    isLogin,
    error,
    successMessage,
    enabledWarning,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}
