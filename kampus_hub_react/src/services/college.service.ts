import { ClientAPI } from "../../api/ApiClient";
import type { ApiResponse, CollegeType } from "../types/CollegeType";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function CollegeService() {
  const api = new ClientAPI(API_URL);

  return {
    getCollege: () => api.get<ApiResponse<CollegeType[]>>("/college"),

    createCollege: (college: CollegeType) =>
      api.post<ApiResponse<CollegeType>>("/college/create-college", college),
  };
}
