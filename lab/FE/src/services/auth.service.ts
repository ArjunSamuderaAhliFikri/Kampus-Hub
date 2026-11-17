import { ClientAPI } from "../../api/ApiClient";
import type { AuthResponse, BodyRequest } from "../types/AuthType";
import { type CollegeType } from "../types/CollegeType";

const API_URL = import.meta.env.VITE_API_URL;

export function AuthService() {
  const api = new ClientAPI(API_URL);

  return {
    login: (body: BodyRequest) =>
      api.post<AuthResponse<CollegeType>>("/auth/login", body),
  };
}
