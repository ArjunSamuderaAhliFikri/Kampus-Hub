import { ClientAPI } from "../../api/ApiClient";
import type {
  AuthResponse,
  BodyRequest,
  RegisterRequest,
  UserResponse,
} from "../types/AuthType";

const API_URL = import.meta.env.VITE_API_URL;

export function AuthService() {
  const api = new ClientAPI(API_URL);

  return {
    login: (body: BodyRequest) =>
      api.post<AuthResponse<UserResponse>>("/auth/login", body),
    register: (body: RegisterRequest) =>
      api.post<AuthResponse<UserResponse>>("/auth/register", body),
    logout: () => api.post<AuthResponse<UserResponse>>("/auth/logout", {}),
    // Tidak perlu kirim token di body — cookie httpOnly dikirim otomatis oleh browser
    refreshToken: () =>
      api.post<AuthResponse<UserResponse>>("/auth/refresh-token", {}),
    // Endpoint untuk cek siapa user yang sedang login
    getMe: () => api.get<AuthResponse<UserResponse>>("/auth/me"),
  };
}
