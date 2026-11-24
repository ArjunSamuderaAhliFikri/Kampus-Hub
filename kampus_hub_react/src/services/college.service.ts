import { ClientAPI } from "../../api/ApiClient";
import { useAuthContext } from "../context/useAuthContext";
import type { ApiResponse, CollegeType } from "../types/CollegeType";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function CollegeService() {
  const { accessToken } = useAuthContext();
  const api = new ClientAPI(API_URL, {
    Authorization: `Bearer ${accessToken}`,
  });

  return {
    getCollege: () => api.get<ApiResponse<CollegeType[]>>("/college"),

    createCollege: (college: CollegeType) =>
      api.post<ApiResponse<CollegeType>>("/college/create-college", college),
  };
}
