import { useState } from "react";
import { AuthService } from "../services/auth.service";
import type { BodyRequest } from "../types/AuthType";

export function useAuthPresenter() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [enabledWarning, setEnabledWarning] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const authService = AuthService();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { user, message, error } = await authService.login({
        username,
        password,
      } as BodyRequest);

      if (error) {
        setError(error);
        setEnabledWarning(true);
      }

      if (user) {
        alert(message);
        console.log(message, user);

        setEnabledWarning(false);
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error from login auth : ", error);

      setError(error);
      setIsLogin(false);
      setEnabledWarning(true);
    }
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");

    setIsLogin(false);
  };

  const authValue = { username, password };
  const authSetterValue = { setUsername, setPassword };

  return {
    authValue,
    authSetterValue,
    isLogin,
    error,
    enabledWarning,
    handleLogin,
    handleLogout,
  };
}
